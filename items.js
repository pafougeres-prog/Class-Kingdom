const items = [
  // WEAPONS
  { name: "Wood Stick", type: "weapon", rarity: "common", attack: 2 },
  { name: "Iron Sword", type: "weapon", rarity: "rare", attack: 5 },
  { name: "Knight Blade", type: "weapon", rarity: "epic", attack: 10 },
  { name: "Dragon Slayer", type: "weapon", rarity: "legendary", attack: 20 },

  // HELMETS
  { name: "Cloth Hat", type: "helmet", rarity: "common", armor: 1 },
  { name: "Iron Helmet", type: "helmet", rarity: "rare", armor: 3 },
  { name: "Knight Helm", type: "helmet", rarity: "epic", armor: 6 },
  { name: "Dragon Crown", type: "helmet", rarity: "legendary", armor: 10 },
 // ARMORS
  { name: "leather top", type: "helmet", rarity: "common", armor: 1 },
  { name: "Iron cuirass", type: "helmet", rarity: "rare", armor: 3 },
  { name: "Knight plates", type: "helmet", rarity: "epic", armor: 6 },
  { name: "Dragon skin", type: "helmet", rarity: "legendary", armor: 10 },
  // GLOVES
  { name: "leather gloves", type: "helmet", rarity: "common", armor: 1 },
  { name: "spiked mittens", type: "helmet", rarity: "rare", armor: 3 },
  { name: "Knight plates", type: "helmet", rarity: "epic", armor: 6 },
  { name: "Dragon fist", type: "helmet", rarity: "legendary", armor: 10 },
 // BELTS
  { name: "Quartz belt", type: "helmet", rarity: "common", attack: 2 },
  { name: "Emerald belt", type: "helmet", rarity: "rare", attack: 4 },
  { name: "Ruby belt", type: "helmet", rarity: "epic", attack: 6 },
  { name: "Diamond belt", type: "helmet", rarity: "legendary", attack: 10 },
 // BOOTS
  { name: "leather boots", type: "helmet", rarity: "common", armor: 1 },
  { name: "spiked boots", type: "helmet", rarity: "rare", armor: 3 },
  { name: "Knight greaves", type: "helmet", rarity: "epic", armor: 6 },
  { name: "Dragon fist", type: "helmet", rarity: "legendary", armor: 10 },
  
];


//RANDOM ITEM//
function getRandomItem() {
  let roll = Math.random() * 100;

  let pool;

  if (roll < 80) {
    pool = items.filter(i => i.rarity === "common");
  } else if (roll < 95) {
    pool = items.filter(i => i.rarity === "uncommon");
  } else if (roll < 99) {
    pool = items.filter(i => i.rarity === "rare");
  } else {
    pool = items.filter(i => i.rarity === "legendary");
  }

  return pool[Math.floor(Math.random() * pool.length)];
}

//Ouvrir un coffre//
function openChest() {
  let item = getRandomItem();

  addItem(item);

  document.getElementById("dialogue").innerHTML = `
    <p>🎁 You got: ${item.name} (${item.rarity})</p>
  `;
}
