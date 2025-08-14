let indiceAtual = 0;
let pontuacao = 0;

const perguntaEl = document.getElementById("pergunta");
const opcoesEl = document.getElementById("opcoes");
const pontuacaoEl = document.getElementById("pontuacao");
const btnRecomecar = document.getElementById("btnRecomecar");

function carregarFlashcard() {
  const card = flashcards[indiceAtual];
  perguntaEl.textContent = card.pergunta;
  opcoesEl.innerHTML = "";

  card.opcoes.forEach(opcao => {
    const btn = document.createElement("button");
    btn.textContent = opcao;
    btn.classList.add("opcao");
    btn.onclick = () => verificarResposta(opcao, btn);
    opcoesEl.appendChild(btn);
  });
}

function verificarResposta(opcao, botao) {
  const correta = flashcards[indiceAtual].correta;

  if (opcao === correta) {
    botao.classList.add("correta");
    pontuacao++;
  } else {
    botao.classList.add("errada");
    [...opcoesEl.children].forEach(b => {
      if (b.textContent === correta) {
        b.classList.add("correta");
      }
    });
  }

  pontuacaoEl.textContent = pontuacao;

  [...opcoesEl.children].forEach(b => b.disabled = true);

  setTimeout(() => {
    indiceAtual++;
    if (indiceAtual < flashcards.length) {
      carregarFlashcard();
    } else {
      perguntaEl.textContent = `Quiz finalizado! 🎉 Sua pontuação foi ${pontuacao}/${flashcards.length}`;
      opcoesEl.innerHTML = "";
      btnRecomecar.style.display = "inline-block";
    }
  }, 1000);
}

function recomecar() {
  indiceAtual = 0;
  pontuacao = 0;
  pontuacaoEl.textContent = pontuacao;
  btnRecomecar.style.display = "none";
  carregarFlashcard();
}

carregarFlashcard();
