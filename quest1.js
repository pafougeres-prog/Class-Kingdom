// ========================
// VARIABLES
// ========================
let currentQuestions = [];
let currentIndex = 0;
let score = 0;


// ========================
// QUESTIONS (tu peux en ajouter)
// ========================
const questions = [

{ q: "What is mother?", options: ["แม่", "พ่อ", "พี่ชาย", "น้องสาว"], correct: 0 },
{ q: "What is father?", options: ["แม่", "พ่อ", "พี่สาว", "ลุง"], correct: 1 },
{ q: "What is brother?", options: ["แม่", "พ่อ", "พี่ชาย", "ป้า"], correct: 2 },
{ q: "What is sister?", options: ["ลุง", "ป้า", "น้า", "พี่สาว"], correct: 3 },

{ q: "What is your name?", options: ["My name is John", "I name John", "Me John", "Name John"], correct: 0 },
{ q: "How old are you?", options: ["I old 15", "I am 15", "I age 15", "15 I am"], correct: 1 },
{ q: "Where do you live?", options: ["I Bangkok live", "Live I Bangkok", "I live in Bangkok", "I am live Bangkok"], correct: 2 },
{ q: "What do you do?", options: ["Farmer I am", "I farmer", "I am job farmer", "I am a farmer"], correct: 3 }
{ q: "What is grandfather?", options: ["ปู่", "พ่อ", "แม่", "พี่"], correct: 0 },
{ q: "What is grandmother?", options: ["ลุง", "ย่า", "พี่", "น้อง"], correct: 1 },
{ q: "What is uncle?", options: ["แม่", "พ่อ", "ลุง", "ป้า"], correct: 2 },
{ q: "What is aunt?", options: ["พี่", "น้อง", "ลุง", "ป้า"], correct: 3 },

{ q: "My name ___ John.", options: ["is", "am", "are", "be"], correct: 0 },
{ q: "I ___ 15 years old.", options: ["be", "am", "is", "are"], correct: 1 },
{ q: "I live ___ Bangkok.", options: ["at", "on", "in", "to"], correct: 2 },
{ q: "He ___ a teacher.", options: ["be", "am", "are", "is"], correct: 3 },

{ q: "She is my ___ (mother).", options: ["แม่", "พ่อ", "พี่", "น้อง"], correct: 0 },
{ q: "He is my ___ (father).", options: ["แม่", "พ่อ", "ลุง", "ป้า"], correct: 1 },
{ q: "He is my ___ (brother).", options: ["แม่", "พ่อ", "พี่ชาย", "น้องสาว"], correct: 2 },
{ q: "She is my ___ (sister).", options: ["ลุง", "ป้า", "น้า", "พี่สาว"], correct: 3 },

{ q: "What is your father's job?", options: ["He is a farmer", "He farmer", "He is farmer job", "Farmer he"], correct: 0 },
{ q: "What is your mother's job?", options: ["She teacher", "She is a teacher", "Teacher she is", "She is teacher job"], correct: 1 },
{ q: "Where do you live?", options: ["I live Bangkok", "I am Bangkok", "I live in Phichit", "Live I Phichit"], correct: 2 },
{ q: "How old are you?", options: ["I age 16", "16 I am", "I 16", "I am 16"], correct: 3 },

{ q: "Who is she?", options: ["She is my mother", "She my mother", "My mother she", "Mother she is"], correct: 0 },
{ q: "Who is he?", options: ["He my father", "He is my father", "Father he", "He father is"], correct: 1 },
{ q: "What do you do?", options: ["I job student", "Student I am", "I am a student", "I student am"], correct: 2 },
{ q: "Where do you live?", options: ["Bangkok I live", "I Bangkok", "Live in Bangkok I", "I live in Bangkok"], correct: 3 },

{ q: "My brother ___ 10 years old.", options: ["is", "am", "are", "be"], correct: 0 },
{ q: "My sister ___ a student.", options: ["be", "is", "am", "are"], correct: 1 },
{ q: "My father works ___ farm.", options: ["on", "in", "at", "to"], correct: 2 },
{ q: "My mother ___ a teacher.", options: ["be", "am", "are", "is"], correct: 3 },

{ q: "What is your name?", options: ["My name is Anna", "I Anna", "Name Anna", "Anna me"], correct: 0 },
{ q: "How old are you?", options: ["I old 12", "I am 12", "12 I", "I age 12"], correct: 1 },
{ q: "Where do you live?", options: ["I Bangkok", "I live Bangkok", "I live in Chiang Mai", "Live I Chiang Mai"], correct: 2 },
{ q: "What do you do?", options: ["Student I", "I am student job", "I student", "I am a student"], correct: 3 },

{ q: "Who is he?", options: ["He is my uncle", "He uncle", "Uncle he", "He is uncle"], correct: 0 },
{ q: "Who is she?", options: ["She aunt", "She is my aunt", "Aunt she", "She is aunt"], correct: 1 },
{ q: "My grandfather is ___", options: ["young", "teacher", "old", "student"], correct: 2 },
{ q: "My grandmother is ___", options: ["student", "young", "teacher", "old"], correct: 3 },

{ q: "Where do you live?", options: ["I live in Thailand", "I Thailand", "Thailand I live", "Live Thailand"], correct: 0 },
{ q: "What is your job?", options: ["I am job teacher", "I am a teacher", "Teacher I am job", "I teacher"], correct: 1 },
{ q: "How old are you?", options: ["I old 20", "20 I", "I am 20", "Age I 20"], correct: 2 },
{ q: "What is your name?", options: ["Name I John", "John I", "I John name", "My name is John"], correct: 3 }

];
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
    <p>🧙‍♂️ "Hello traveler! I love sticks! Ready?"</p>
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

  if (currentIndex < 5) {
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
