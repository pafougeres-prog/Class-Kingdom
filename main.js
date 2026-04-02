const supabaseUrl = "https://zfseazpheehiawebxrgx.supabase.co";
const supabaseKey = "sb_publishable_2NpNBMV2yoVX5kNKLZyzPA_WCCEGt2Y";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

let playerId = null;

async function login() {
  const nickname = document.getElementById("nickname").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  if (!nickname || !password) {
    alert("Enter nickname and password");
    return;
  }

  let { data, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("nickname", nickname)
    .eq("password", password);

  if (error || data.length === 0) {
    alert("Wrong nickname or password");
    return;
  }

  playerId = data[0].id;
  updateUI(data[0]);
}

function updateUI(player) {
  document.getElementById("player").innerText = "Player: " + player.nickname;
  document.getElementById("tribe").innerText = "Classroom: " + player.tribe;
  document.getElementById("gold").innerText = "Gold: " + player.gold;
  document.getElementById("player_class").src = player.player_class;

  document.getElementById("stats").innerText =
    "❤️ " + player.health +
    " | 🛡️ " + player.armor +
    " | ⚔️ " + player.attack;
}

async function addGold() {
  if (!playerId) {
    alert("Login first");
    return;
  }

  let { data } = await supabaseClient
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

let inventory = [];
  
  await supabaseClient
    .from("players")
    .update({ gold: newGold })
    .eq("id", playerId);

  document.getElementById("gold").innerText = "Gold: " + newGold;
}
async function addGoldSimple(amount) {
  if (!playerId) {
    alert("Login first");
    return;
  }

  let { data, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  let newGold = data.gold + amount;

  await supabaseClient
    .from("players")
    .update({ gold: newGold })
    .eq("id", playerId);

  document.getElementById("gold").innerText = "Gold: " + newGold;
}

}

//Ajout a l inventaire//
function addItem(item) {
  inventory.push(item);
  updateInventoryUI();
}

//update inventaire//
function updateInventoryUI() {
  document.getElementById("inventory").innerHTML =
    "<h3>Inventory</h3>" +
    inventory.map(i => `<p>${i.name} (${i.rarity})</p>`).join("");
