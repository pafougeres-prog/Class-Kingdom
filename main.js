const supabaseUrl = "https://zfseazpheehiawebxrgx.supabase.co";
const supabaseKey = "sb_publishable_2NpNBMV2yoVX5kNKLZyzPA_WCCEGt2Y";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);



// ========================
// ========================
// Variables
// ========================
// ========================



// ========================
// Player Identification
// ========================
let playerId = null;


// ========================
// Affichage inventaire
// ========================
function updateInventoryUI() {
  document.getElementById("equipment").innerHTML =
    "<h3>Equipment</h3>" +
    inventory.map(i => `<p>${i.name} (${i.rarity})</p>`).join("");
}

// ========================
// updateUI() du joueur
// ========================
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
// Login
// ========================
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
  
// SI PAS D'ÉQUIPEMENT
equipment = data[0].equipment || equipment;
// ÉQUIPEMENT
updateEquipmentUI();
updateStats();
 
  
}


// ========================
// STATS DU JOUEUR
// ========================
function updateStats() {
  let baseHealth = 100;
  let baseAttack = 5;
  let baseArmor = 2;

  let totalAttack = baseAttack;
  let totalArmor = baseArmor;

  Object.values(equipment).forEach(item => {
    if (item) {
      totalAttack += item.attack || 0;
      totalArmor += item.armor || 0;
    }
  });
  
updateStats();


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

// ========================
// Ajout gold
// ========================

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

// ========================
// EQUIPMENT rareté
// ========================
const rarityOrder = {
  common: 1,
  rare: 2,
  epic: 3,
  legendary: 4
};

// ========================
// EQUIPMENT haute rarete>lower rarete
// ========================
function equipItem(item) {
  let current = equipment[item.type];

  if (!current || rarityOrder[item.rarity] > rarityOrder[current.rarity]) {
    equipment[item.type] = item;
    updateEquipmentUI();
    updateStats();
    saveEquipment();
  } else {
    alert("You already have better equipment!");
  }
}
// ========================
// EQUIPMENT visuel
// ========================
function updateEquipmentUI() {
  document.getElementById("equipment").innerHTML = `
    <h3>Equipment</h3>
    <p>⚔️ Weapon: ${equipment.weapon?.name || "None"}</p>
    <p>🪖 Helmet: ${equipment.helmet?.name || "None"}</p>
    <p>🛡️ Armor: ${equipment.armor?.name || "None"}</p>
    <p>👢 Boots: ${equipment.boots?.name || "None"}</p>
    <p>🎗️ Belt: ${equipment.belt?.name || "None"}</p>
    <p>🐺 Pet: ${equipment.pet?.name || "None"}</p>
  `;
}
