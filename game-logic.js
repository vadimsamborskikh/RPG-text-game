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
      gameState.currentEnemy = createRandomEnemy(locationName);
      gameState.gamePhase = "combat";
      showEnemyPanel();
      if (gameState.currentEnemy) {
        addLocationLog(locationName, gameState.currentEnemy.name);
      } else {
        addLocationLog(locationName);
      }
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
  gameState.currentEnemy = null;
  gameState.gamePhase = "exploration";

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
      гоблин: "goblin",
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
  try {
    const combatButtons = document.querySelectorAll("[data-action]");

    if (!combatButtons || combatButtons.length === 0) {
      throw new Error("Кнопки битвы не найдены");
    }

    combatButtons.forEach((button) => {
      const action = button.getAttribute("data-action");

      switch (action) {
        case "attack":
          button.addEventListener("click", playerAttack);
          break;

        case "defend":
          button.addEventListener("click", () => {
            addCombatLog("Вы защищаетесть и получаете 1 урон!");

            gameState.hero.hp -= 1;
            updatePlayerStats();
          });
          break;

        case "potion":
          button.addEventListener("click", () => {
            if (gameState.hero.inventory.length > 0) {
              const potionIndex =
                gameState.hero.inventory.indexOf("Зелье здоровья");
              if (potionIndex !== -1) {
                gameState.hero.inventory.shift();
              }

              const healthAmount = 15;
              const oldHp = gameState.hero.hp;
              gameState.hero.hp += healthAmount;
              if (gameState.hero.hp > gameState.hero.maxHp) {
                gameState.hero.hp = gameState.hero.maxHp;
              }

              addCombatLog(
                `Вы выпили зелье здоровья и восстановили ${
                  gameState.hero.hp - oldHp
                } HP!`,
              );

              updatePlayerStats();

              enemyAttack();

              updateInventory();
            }
          });
          break;

        case "flee":
          button.addEventListener("click", () => {
            const randomFlee = Math.random();

            if (randomFlee > 0.5) {
              addCombatLog(
                `Вам удалось сбежать от ${gameState.currentEnemy.name}`,
              );

              gameState.currentEnemy = null;
              gameState.gamePhase = "exploration";
            } else {
              addCombatLog("Побег не удался! Сражайся дальше.");
            }
          });
          break;
      }
    });
  } catch (error) {
    console.log("Ошибка при инициализации боевых кнопок:", error.message);
  }
}

function playerAttack() {
  try {
    if (!gameState.currentEnemy) {
      addCombatLog("Враг не найден");
      return;
    }

    let damage = gameState.hero.attack - gameState.currentEnemy.defense;

    if (damage < 1) {
      damage = 1;
    }

    gameState.currentEnemy.hp -= damage;

    addCombatLog(
      `Вы атаковали ${gameState.currentEnemy.name} и нанесли ${damage} урона`,
    );

    updateEnemyStats();

    if (gameState.currentEnemy.hp <= 0) {
      enemyDefeat();
    } else {
      enemyAttack();
    }
  } catch (error) {
    console.log("Ошибка в playerAttack:", error.message);
  }
}

function enemyDefeat() {
  try {
    if (!gameState.currentEnemy) return;

    const enemyName = gameState.currentEnemy.name;
    const xpGained = gameState.currentEnemy.xp || 10;

    gameState.hero.xp += xpGained;

    addCombatLog(`Вы победили ${enemyName} и получили ${xpGained} опыта!`);

    gameState.currentEnemy = null;
    gameState.gamePhase = "exploration";

    updateEnemyStats();
    showEnemyPanel();

    updatePlayerStats();
  } catch (error) {
    console.log("Ошибка в enemyDefeated:", error.message);
  }
}

function enemyAttack() {
  try {
    if (!gameState.currentEnemy || gameState.currentEnemy.hp <= 0) {
      return;
    }

    let damage = gameState.currentEnemy.attack - gameState.hero.defense;
    if (damage < 1) damage = 1;

    gameState.hero.hp -= damage;

    addCombatLog(
      `${gameState.currentEnemy.name} атакует вас и наносит ${damage} урона!`,
    );

    updatePlayerStats();

    if (gameState.hero.hp <= 0) {
      gameState.hero.hp = 0;
      addCombatLog("Вы погибли! Игра окончена.");
      updatePlayerStats();
      disabledActionAndTravelButtons();
    }
  } catch (error) {
    console.log("Ошибка в enemyAttack:", error.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initCombatButtons();
});

function checkLevelUp() {
  try {
    if (gameState.hero.xp >= gameState.hero.xpToNextLevel) {
      const excessXp = gameState.hero.xp - gameState.hero.xpToNextLevel;
      gameState.hero.xp = excessXp;

      gameState.hero.level += 1;
      gameState.hero.maxHp += 1;
      gameState.hero.hp = gameState.hero.maxHp;
      gameState.hero.attack += 1;
      gameState.hero.defense += 1;

      addCombatLog(`Вы достигли ${gameState.hero.level} уровня!`);

      updatePlayerStats();
    }
  } catch (error) {
    console.log("Ошибка в checkLevelUp:", error.message);
  }
}

function disabledActionAndTravelButtons() {
  try {
    const actionBtn = document.querySelectorAll(".btn-action");

    actionBtn.forEach((button) => {
      button.disabled = true;
      button.classList.add("btn-disabled");
    });
  } catch (error) {
    console.error(`Поймана ошибка в диактивации кнопок: ${error}`);
  }
}

function enabledActionAndTravelButtons() {
  try {
    const actionBtn = document.querySelectorAll(".btn-action");

    actionBtn.forEach((button) => {
      button.disabled = false;
      button.classList.remove("btn-disabled");
    });
  } catch (error) {
    console.error(`Поймана ошибка в диактивации кнопок: ${error}`);
  }
}

function restartGame() {
  try {
    const restartButton = document.getElementById("reset-btn");
    const enemyPanel = document.getElementById("enemy-section");
    const combatPanel = document.getElementById("combat-actions");

    restartButton.addEventListener("click", () => {
      gameState.hero.hp = gameState.hero.maxHp;
      gameState.hero.level = 1;
      gameState.hero.xp = 0;
      gameState.currentLocation = "Деревня";
      gameState.currentEnemy = null;
      gameState.gamePhase = "exploration";
      gameState.hero.inventory = [
        "Зелье здоровья",
        "Зелье здоровья",
        "Зелье здоровья",
      ];

      if (!gameState.currentEnemy) {
        enemyPanel.style.display = "none";
      }

      if (!combatPanel) {
        combatPanel.style.display = "none";
      }

      updatePlayerStats();
      updateUI();
      resetLog();
      updateInventory();
    });
  } catch (error) {
    console.error(`Поймана ошибка в рестарте игры: ${error}`);
  }
}

restartGame();
