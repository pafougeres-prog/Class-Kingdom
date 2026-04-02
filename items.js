const items = [
  // COMMON (80%)
  { name: "Old Stick", rarity: "common", attack: 1 },
  { name: "Pointed stick", rarity: "common", attack: 2 },

  // UNCOMMON (10%)
  { name: "stick club", rarity: "uncommon", attack: 4 },

  // RARE (5%)
  { name: "spiked club", rarity: "rare", attack: 6 },

  // LEGENDARY (1%)
  { name: "nailed board", rarity: "legendary", attack: 10 }
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
