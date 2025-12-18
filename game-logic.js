const forestButton = document.getElementById("dark-forest");
const bogsButton = document.getElementById("peat-bogs");
const minesButton = document.getElementById("abandoned-mines");
const villageButton = document.getElementById("village");


forestButton.addEventListener("ckick", () => {
  goToLocation("Мрачный лес");
});

function goToLocation(locationName) {
  gameState.currentLocation = locationName;
  gameState.gamePhase = "combat";
  //   gameState.currentEnemy = createRandomEnemy(); // TODO: написать функцию

  if (window.updateUI) {
    updateUI();
  }
}

// function returnToVillage() {
//   gameState.currentLocation = "Деревня";
//   gameState.gamePhase = "exploration";
//   gameState.currentEnemy = null;

//   updateUI();
// }

// function playerAttack() {
//   gameState.currentEnemy.hp -=
//     gameState.hero.attack - gameState.currentEnemy.defense;
// }
