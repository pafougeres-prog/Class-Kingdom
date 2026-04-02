function startQuest1() {
  document.getElementById("dialogue").innerHTML = `
    <p>🧙‍♂️ "Hello traveler! I love sticks! Do you know your family?"</p>
    <button onclick="q1_ex1()">Start</button>
  `;
}

function q1_ex1() {
  document.getElementById("dialogue").innerHTML = `
    <p>🧙‍♂️ "What is mother?"</p>

    <button onclick="correctAnswer()">แม่</button>
    <button onclick="wrongAnswer()">พ่อ</button>
  `;
}

const questions = [
  { q: "What is mother?", options: ["แม่", "พ่อ"], correct: 0 },
  { q: "What is father?", options: ["แม่", "พ่อ"], correct: 1 },
  { q: "What is brother?", options: ["พี่ชาย", "แม่"], correct: 0 },
  { q: "What is sister?", options: ["พ่อ", "พี่สาว"], correct: 1 },

  { q: "What is your name?", options: ["I name John", "My name is John"], correct: 1 },
  { q: "How old are you?", options: ["I 15", "I am 15"], correct: 1 },
  { q: "Where do you live?", options: ["I live in Phichit", "I am live Phichit"], correct: 0 },
  { q: "What does your father do?", options: ["He is a farmer", "He farmer"], correct: 0 },
];
function correctAnswer() {
  alert("Correct! +1 gold");
  addGoldSimple(1);
}

function wrongAnswer() {
  alert("Wrong!");
}

async function addGoldSimple(amount) {
  let { data } = await supabaseClient
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

  let newGold = data.gold + amount;

  await supabaseClient
    .from("players")
    .update({ gold: newGold })
    .eq("id", playerId);

  document.getElementById("gold").innerText = "Gold: " + newGold;
}
