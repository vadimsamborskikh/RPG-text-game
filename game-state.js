const gameState = {
  hero: {
    name: "Странник",
    hp: 30,
    maxHp: 30,
    attack: 5,
    defense: 3,
    inventory: [
      "Зелье здоровья",
      "Зелье здоровья",
      "Простой меч",
      "Деревянный щит",
    ],
  },
  currentLocation: "Деревня",
  currentEnemy: null,
  gamePhase: "exploration",
};

console.log(gameState);
