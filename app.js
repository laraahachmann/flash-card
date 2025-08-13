const cardContainer = document.getElementById('card-container');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  nextButton.style.display = 'none';
  showQuestion();
}

function showQuestion() {
  cardContainer.innerHTML = '';
  const current = perguntas[currentQuestionIndex];

  const card = document.createElement('div');
  card.classList.add('card');

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');
  cardFront.innerHTML = `<h2>${current.pergunta}</h2>`;

  const answersDiv = document.createElement('div');
  answersDiv.classList.add('answers');
  current.respostas.forEach(resposta => {
    const btn = document.createElement('button');
    btn.classList.add('answer-btn');
    btn.innerText = resposta.texto;
    btn.addEventListener('click', () => selectAnswer(resposta, card));
    answersDiv.appendChild(btn);
  });
  cardFront.appendChild(answersDiv);

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.innerHTML = `<h3>Resposta Correta: ${current.respostas.find(r=>r.correta).texto}</h3>`;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  card.appendChild(cardInner);
  cardContainer.appendChild(card);
}

function selectAnswer(resposta, card) {
  card.classList.add('flipped');
  nextButton.style.display = 'block';
}

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < perguntas.length) {
    showQuestion();
    nextButton.style.display = 'none';
  } else {
    cardContainer.innerHTML = `<h2>🎉 Quiz Finalizado! 🎉</h2>`;
    nextButton.innerText = "Recomeçar";
    nextButton.onclick = startQuiz;
    nextButton.style.display = 'block';
  }
});

startQuiz();
