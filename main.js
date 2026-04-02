const supabaseUrl = "https://zfseazpheehiawebxrgx.supabase.co";
const supabaseKey = "sb_publishable_2NpNBMV2yoVX5kNKLZyzPA_WCCEGt2Y";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

let playerId = null;

// ========================
// INVENTORY
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
