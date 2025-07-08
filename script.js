const questionPool = [
  { question: "Скільки буде 10 * 1,5", options: ["12", "15", "20", "25"], answer: 1 },
  { question: "Скільки буде 100 * 0,5", options: ["500", "800", "1", "50"], answer: 3 },
  { question: "Скільки буде 1000 : 50", options: ["5", "20", "200", "10"], answer: 1 },
  { question: "Скільки буде 42 * 100", options: ["41", "1000", "4200", "420"], answer: 3 },
  { question: "Корінь x + 15 = 27 дорівнює:", options: ["9", "13", "12", "15"], answer: 2 },
  { question: "Корінь 3 * x = 21 дорівнює", options: ["100", "7", "2", "5000"], answer: 1 },
  { question: "Скільки буде 72 : 6 * 4", options: ["8", "10", "3", "5"], answer: 2 },
  { question: "Скільки буде 234 + 567 =", options: ["802", "801", "900", "799"], answer: 1 },
  { question: "Скільки буде 12 * 4 =", options: ["160", "80", "48", "67"], answer: 2 },
  { question: "Скільки буде 25 * 8 =", options: ["100", "400", "180", "200"], answer: 3 }
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 300;
let timerInterval;

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function prepareQuiz() {
  const shuffledPool = shuffleArray(questionPool);
  questions = shuffledPool.slice(0, 10);
  questions.forEach(q => {
    const correct = q.options[q.answer];
    q.options = shuffleArray(q.options);
    q.answer = q.options.indexOf(correct);
  });
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("time").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      showFinalResults();
    }
  }, 1000);
}

function loadQuestion() {
  const question = questions[currentQuestion];
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
    <h2>Питання ${currentQuestion + 1} з ${questions.length}</h2>
    <p>${question.question}</p>
    <ul>
      ${question.options.map((option, i) => `
        <li>
          <input type="radio" id="option${i}" name="question" value="${i}">
          <label for="option${i}">${option}</label>
        </li>`).join('')}
    </ul>
  `;
}

function checkAnswer() {
  const selected = document.querySelector('input[name="question"]:checked');
  if (!selected) {
    alert("Будь ласка, оберіть відповідь!");
    return null;
  }
  return parseInt(selected.value) === questions[currentQuestion].answer;
}

function showFeedback(isCorrect) {
  currentQuestion++;
  if (isCorrect) score++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResults();
  }
}

function showFinalResults() {
  clearInterval(timerInterval);
  const percentage = Math.round((score / questions.length) * 100);
  let message;
  if (percentage >= 80) message = "Відмінно! 🎉";
  else if (percentage >= 60) message = "Добре! 👍";
  else if (percentage >= 40) message = "Не погано! 😊";
  else message = "Можна краще! 👀";

  document.getElementById("modal-message").textContent = message;
  document.getElementById("score-message").textContent = `Ви набрали ${score} з ${questions.length} (${percentage}%)`;
  document.getElementById("resultModal").style.display = "flex";
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 150;
  prepareQuiz();
  updateTimerDisplay();
  document.getElementById("quiz").style.display = "none";
  document.getElementById("navigation").style.display = "none";
  document.getElementById("start-btn").style.display = "block";
  document.getElementById("resultModal").style.display = "none";
}

document.getElementById("start-btn").addEventListener("click", () => {
  prepareQuiz();
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  document.getElementById("navigation").style.display = "flex";
  loadQuestion();
  startTimer();
});

document.getElementById("submit-btn").addEventListener("click", () => {
  const isCorrect = checkAnswer();
  if (isCorrect !== null) {
    showFeedback(isCorrect);
  }
});

document.getElementById("restart-btn").addEventListener("click", resetQuiz);
document.getElementById("close-modal").addEventListener("click", () => {
  document.getElementById("resultModal").style.display = "none";
});

document.addEventListener("DOMContentLoaded", resetQuiz);

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

my_array = [1, 2, 3, 4, 5] // Початковий масив
shuffle(my_array)  // Перемішуємо масив
