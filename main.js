const supabaseUrl = "https://zfseazpheehiawebxrgx.supabase.co";
const supabaseKey = "sb_publishable_2NpNBMV2yoVX5kNKLZyzPA_WCCEGt2Y";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

let playerId = null;

// ========================
// EQUIPMENT
// ========================

let equipment = {
  weapon: null,
  helmet: null,
  armor: null,
  boots: null,
  belt: null,
  pet: null
};
// ========================
// inventory
// ========================

let inventory = [];

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

// Ajout à l'inventaire
function addItem(item) {
  inventory.push(item);
  updateInventoryUI();
}

// Affichage inventaire
function updateInventoryUI() {
  document.getElementById("inventory").innerHTML =
    "<h3>Inventory</h3>" +
    inventory.map(i => `<p>${i.name} (${i.rarity})</p>`).join("");
}

// ========================
// SHOP
// ========================
async function buyChest() {
  let cost = 100;

  let { data } = await supabaseClient
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();

  if (data.gold < cost) {
    alert("Not enough gold!");
    return;
  }

  let newGold = data.gold - cost;

  await supabaseClient
    .from("players")
    .update({ gold: newGold })
    .eq("id", playerId);

  document.getElementById("gold").innerText = "Gold: " + newGold;

  openChest(); // ⚠️ doit exister dans items.js
}

// AJOUT DE GOLD
// SI pas de joueur log, ajout annulé
async function addGoldSimple(amount) {
  if (!playerId) {
    alert("Login first");
    return;
  }
// SI OK attend reponse de SUPABASE
  let { data, error } = await supabaseClient
    .from("players")
    .select("*")
    .eq("id", playerId)
    .single();
// SI ERREUR alors retour
  if (error) {
    console.log(error);
    return;
  }
// SI SUPABASE REPOND UPDATE GOLD JOUEUR
  let newGold = data.gold + amount;

  await supabaseClient
    .from("players")
    .update({ gold: newGold })
    .eq("id", playerId);
// NOUVEAU solde de gold
  document.getElementById("gold").innerText = "Gold: " + newGold;
}
