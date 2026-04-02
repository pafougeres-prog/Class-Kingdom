// ========================
// VARIABLES
// ========================
let currentQuestions = [];
let currentIndex = 0;
let score = 0;


// ========================
// QUESTIONS
// ========================
const questions = [
  { q: "What is mother?", options: ["แม่", "พ่อ", "พี่ชาย", "น้องสาว"], correct: 0 },
  { q: "What is father?", options: ["แม่", "พ่อ", "พี่สาว", "ลุง"], correct: 1 },
  { q: "What is brother?", options: ["แม่", "พ่อ", "พี่ชาย", "ป้า"], correct: 2 },
  { q: "What is sister?", options: ["ลุง", "ป้า", "น้า", "พี่สาว"], correct: 3 }
];


// ========================
// SHUFFLE
// ========================
function shuffle(array) {
  let a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


// ========================
// START QUEST
// ========================
function startQuest1() {
  currentQuestions = shuffle(questions).slice(0, 5);
  currentIndex = 0;
  score = 0;

  document.getElementById("dialogue").innerHTML = `
    <p>🧙‍♂️ "Hello traveler! Ready?"</p>
    <button onclick="showQuestion()">Start</button>
  `;
}


// ========================
// SHOW QUESTION
// ========================
function showQuestion() {
  let q = currentQuestions[currentIndex];

  document.getElementById("dialogue").innerHTML = `
    <p>🧙‍♂️ "${q.q}"</p>
    ${q.options.map((opt, i) =>
      `<button onclick="answer(${i})">${opt}</button>`
    ).join("<br>")}
  `;
}


// ========================
// ANSWER
// ========================
function answer(choice) {
  let q = currentQuestions[currentIndex];

  if (choice === q.correct) {
    score++;
  }

  currentIndex++;

  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    endQuest();
  }
}


// ========================
// END QUEST
// ========================
function endQuest() {
  document.getElementById("dialogue").innerHTML = `
    <p>🧙‍♂️ "You got ${score}/5!"</p>
    <button onclick="reward()">Get reward</button>
  `;
}


// ========================
// REWARD
// ========================
async function reward() {
  await addGoldSimple(score);

  document.getElementById("dialogue").innerHTML = `
    <p>🧙‍♂️ "You earned ${score} gold!"</p>
    <button onclick="startQuest1()">Try again</button>
  `;
}
