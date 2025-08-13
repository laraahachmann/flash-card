const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Próxima Pergunta ➡️";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = perguntas[currentQuestionIndex];
  questionContainer.innerText = currentQuestion.pergunta;

  currentQuestion.respostas.forEach(resposta => {
    const button = document.createElement('button');
    button.innerText = resposta.texto;
    button.classList.add('btn');
    if (resposta.correta) {
      button.dataset.correct = resposta.correta;
    }
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) score++;
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
  });
  nextButton.style.display = 'block';
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < perguntas.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionContainer.innerText = `🎉 Você acertou ${score} de ${perguntas.length} perguntas! 🎉`;
  nextButton.innerText = "Jogar Novamente 🔄";
  nextButton.style.display = 'block';
  nextButton.addEventListener('click', startQuiz);
}

startQuiz();
