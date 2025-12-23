const forestButton = document.getElementById("dark-forest");
const bogsButton = document.getElementById("peat-bogs");
const minesButton = document.getElementById("abandoned-mines");
const villageButton = document.getElementById("village");

const buttonLocations = {
  "dark-forest": "Мрачный лес",
  "peat-bogs": "Торфяные топи",
  "abandoned-mines": "Заброшенные рудники",
  "return-village": "Деревня",
};

function handleLocationButtonClick(buttonId) {
  try {
    const locationName = locations[buttonId];

    if (!locationName) {
      throw Error("Кнопка не найдена");
    }

    goToLocation(locationName);
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const locationButton = document.querySelectors(".location-btn[id]");

  locationButton.forEach(button => {
    const buttonId = button.id;
    console.log(buttonId);
    
  });
});

forestButton.addEventListener("click", () => {
  goToLocation("Мрачный лес");
  addToLog("Мрачный лес");
});

bogsButton.addEventListener("click", () => {
  goToLocation("Торфяные топи");
});

minesButton.addEventListener("click", () => {
  goToLocation("Заброшенные рудники");
});

villageButton.addEventListener("click", () => {
  goToLocation("Деревня");
});

function goToLocation(locationName) {
  try {
    gameState.currentLocation = locationName;

    if (window.updateUI) {
      updateUI();
    } else {
      throw new Error("Функция updateUI не найдена");
    }
  } catch (error) {
    console.log("Ошибка при переходе в локацию", error);
    console.log("Подробности:", error.message);
  }
}

function returnToVillage() {
  gameState.currentLocation = "Деревня";

  updateUI();
}

// function playerAttack() {
//   gameState.currentEnemy.hp -=
//     gameState.hero.attack - gameState.currentEnemy.defense;
// }
