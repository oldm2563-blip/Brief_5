let currentQuestion = 0;
let score = 0;
let quizData = [];
const result = document.getElementById("highscore")
async function loadQuiz() {
  const res = await fetch('quiz.json');
  quizData = await res.json();
  showQuestion();
}
let highscores = parseInt(localStorage.getItem("high")) || 0;
result.textContent = "Your Highest Score Is: " + highscores;
function showQuestion() {
  const quizContainer = document.getElementById('quiz');
  const theoptions = document.getElementById('options');
  const question = quizData[currentQuestion];

  quizContainer.innerHTML = `
    <h1>${question.question}</h1>
    
  `;
  theoptions.innerHTML = `${question.options
      .map(
        (option, i) => `
          <input type="radio" name="answer" value="${option}">
          ${option}
          <br>
      `
      ).join('')}`
}

const button = document.getElementById('nextBtn')
button.addEventListener('click', () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) {
    return;
  }

  if (selected.value === quizData[currentQuestion].answer) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('nextBtn').style.display = 'none';
    document.getElementById('result').textContent =
      `You scored ${score} out of ${quizData.length}`;
      if (score > highscores) {
      highscores = score;
      localStorage.setItem("high", highscores);
    }

    result.textContent = "Your Highest Score Is: " + highscores;
  }
});


loadQuiz();