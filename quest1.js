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
