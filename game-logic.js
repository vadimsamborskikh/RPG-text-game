const forestButton = document.getElementById("dark-forest");
const bogsButton = document.getElementById("peat-bogs");
const minesButton = document.getElementById("abandoned-mines");
const villageButton = document.getElementById("village");
const clearLogButton = document.getElementById("clear-log-btn");

function handleLocationButtonClick(buttonId) {
  try {
    const locationName = buttonLocations[buttonId];

    if (!locationName) {
      throw Error("Кнопка не найдена");
    }

    goToLocation(locationName);
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const locationButton = document.querySelectorAll(".location-btn");

  locationButton.forEach((button) => {
    const buttonId = button.id;

    if (buttonId && buttonLocations[buttonId]) {
      button.addEventListener("click", () => {
        handleLocationButtonClick(buttonId);
      });
    }
  });
});

function goToLocation(locationName) {
  try {
    gameState.currentLocation = locationName;

    const locationEnemies = locationInfo[locationName];

    if (
      locationEnemies.possibleEnemies &&
      locationEnemies.possibleEnemies.length > 0
    ) {
      console.log("Встречаем врага в", locationName);

      gameState.currentEnemy = createRandomEnemy(locationName);
      gameState.gamePhase = "combat";
      showEnemyPanel();
      addToLog(locationName, gameState.currentEnemy.name)
    } else {
      gameState.currentEnemy = null;
      gameState.gamePhase = "exploration";
    }

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

if (clearLogButton) {
  clearLogButton.addEventListener("click", clearLog);
}

function createRandomEnemy(locationName) {
  try {
    const locationData = locationInfo[locationName];

    if (!locationData || !locationData.possibleEnemies) {
      throw new Error("Данные о врагах не найдены");
    }

    const possibleEnemyNames = locationData.possibleEnemies;
    const randomIndex = Math.floor(Math.random() * possibleEnemyNames.length);
    const enemyName = possibleEnemyNames[randomIndex];

    let enemyKey = enemyName.toLowerCase();

    const enemyMap = {
      "гоблин": "goblin",
      "лесной волк": "wolf",
      "болотная тварь": "swampCreature",
      "пещерный паук": "caveSpider",
    };

    enemyKey = enemyMap[enemyKey] || enemyKey;

    const enemyData = enemies[enemyKey];

    if (!enemyData) {
      throw new Error(`Нет данных для врага ${enemyName} (ключ: ${enemyKey})`);
    }

    return {
      name: enemyData.name,
      hp: enemyData.hp,
      maxHp: enemyData.hp,
      attack: enemyData.attack,
      defense: enemyData.defense,
      xp: enemyData.xp,
    };
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
    return null;
  }
}


function initCombatButtons() {
  
}