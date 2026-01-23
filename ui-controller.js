function updateUI() {
  try {
    const locationDescription = document.getElementById("location-description");
    const locationTitle = document.getElementById("location-title");

    if (!locationDescription) {
      throw new Error("Описание локации не найдено на странице!");
    }

    if (!locationTitle) {
      throw new Error("Заголовок локации не найден на странице!");
    }

    const locationData = locationInfo[gameState.currentLocation];

    locationDescription.textContent = locationData.description;

    locationTitle.textContent = gameState.currentLocation;
  } catch (error) {
    console.log("Ошибка:", error.message);
  }
}

function addLocationLog(location, enemy = null) {
  try {
    const gameLog = document.getElementById("game-log");

    if (!gameLog) {
      throw new Error("Поле лога не найдено");
    }

    const logEntry = document.createElement("p");

    logEntry.classList.add("log-entry");

    if (!enemy) {
      logEntry.textContent = `Вы осуществили переход в локацию ${location}`;
    } else {
      logEntry.textContent = `Вы осуществили переход в локацию ${location}. Вас атакует: ${enemy}!!!`;
    }

    gameLog.append(logEntry);

    gameLog.scrollTop = gameLog.scrollHeight;
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

function addCombatLog(message) {
  try {
    const gameLog = document.getElementById("game-log");

    if (!gameLog) {
      throw new Error("Поле лога не найдено");
    }

    const logEntry = document.createElement("p");

    logEntry.classList.add("log-entry");

    logEntry.textContent = message;

    gameLog.append(logEntry);

    gameLog.scrollTop = gameLog.scrollHeight;
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

function clearLog() {
  try {
    const gameLog = document.getElementById("game-log");
    const logEntrys = document.querySelectorAll(".log-entry");

    if (!gameLog) {
      throw new Error("Поле логов не найдено");
    }

    if (logEntrys.length === 0) {
      throw new Error("Логи не найдены");
    }

    logEntrys.forEach((log) => {
      gameLog.removeChild(log);
    });
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

function resetLog() {
  try {
    const gameLog = document.getElementById("game-log");

    if (!gameLog) {
      throw new Error("Поле логов не найдено");
    }

    gameLog.innerHTML = `
      <p class="log-entry">Добро пожаловать в игру, путник!<br>Пора отправляться в приключение!
      Выбери, куда ты отправишься.</p>
                            `;
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

function showEnemyPanel() {
  try {
    const enemyPanel = document.getElementById("enemy-section");

    if (!enemyPanel) {
      throw new Error("Панель противника не найдена");
    }

    if (gameState.currentEnemy) {
      enemyPanel.style.display = "block";
      updateEnemyStats();

      const combatActions = document.getElementById("combat-actions");
      combatActions.style.display = "block";
    } else {
      enemyPanel.style.display = "none";
    }
  } catch (error) {
    console.log("Подробности:", error.message);
  }
}

function updateEnemyStats() {
  try {
    if (!gameState.currentEnemy) {
      console.log("Нет врага");
      return;
    }

    const enemyName = document.getElementById("enemy-name");
    const enemyHp = document.getElementById("enemy-hp");
    const enemyHealthBar = document.getElementById("enemy-health-bar");
    const enemyAttack = document.getElementById("enemy-attack");
    const enemyDefense = document.getElementById("enemy-defense");

    const percentage =
      (gameState.currentEnemy.hp / gameState.currentEnemy.maxHp) * 100;
    const maxHp = gameState.currentEnemy.maxHp || gameState.currentEnemy.hp;

    if (
      !enemyName ||
      !enemyHp ||
      !enemyHealthBar ||
      !enemyAttack ||
      !enemyDefense
    ) {
      throw new Error("Найдены не все элементы");
    }

    enemyName.textContent = gameState.currentEnemy.name;
    enemyHp.textContent = `${gameState.currentEnemy.hp} / ${maxHp}`;
    enemyAttack.textContent = gameState.currentEnemy.attack;
    enemyDefense.textContent = gameState.currentEnemy.defense;
    enemyHealthBar.style.width = percentage + "%";
  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}

function updatePlayerStats() {
  try {
    const playerName = document.getElementById("player-name");
    const playerHp = document.getElementById("player-hp");
    const playerHealthBar = document.getElementById("player-health-bar");
    const playerAttack = document.getElementById("player-attack");
    const playerDefense = document.getElementById("player-defense");
    const playerLevel = document.getElementById("player-level");
    const playerXp = document.getElementById("player-xp");

    if (playerName) playerName.textContent = gameState.hero.name;

    if (playerHp)
      playerHp.textContent = `${gameState.hero.hp} / ${gameState.hero.maxHp}`;

    if (playerAttack) {
      playerAttack.textContent = gameState.hero.attack;
    }
    
    if (playerDefense) playerDefense.textContent = gameState.hero.defense;

    if (playerLevel) {
      playerLevel.textContent = gameState.hero.level;
      checkLevelUp();
    } 

    if (playerHealthBar) {
      const percentage = (gameState.hero.hp / gameState.hero.maxHp) * 100;
      playerHealthBar.style.width = percentage + "%";

      if (percentage > 50) {
        playerHealthBar.style.background =
          "linear-gradient(90deg, #00b894 0%, #00a085 100%)";
      } else if (percentage > 25) {
        playerHealthBar.style.background =
          "linear-gradient(90deg, #fdcb6e 0%, #e17055 100%)";
      } else {
        playerHealthBar.style.background =
          "linear-gradient(90deg, #ff7675 0%, #d63031 100%)";
      }
    }

    if (playerXp) {
      playerXp.textContent = `${gameState.hero.xp} / ${gameState.hero.xpToNextLevel}`;
    }
  } catch (error) {
    console.log("Ошибка в updatePlayerStats:", error.message);
  }
}

function updateInventory() {
  try {
    const inventoryItem = document.getElementById("inventory-item");
    if (!inventoryItem) return;

    const potionCount = gameState.hero.inventory.filter(
      (item) => item === "Зелье здоровья",
    ).length;

    if (potionCount >= 0) {
      inventoryItem.textContent = `Зелье здоровья ×${potionCount}`;
    }
  } catch (error) {
    console.log("Ошибка при обновлении инвентаря:", error.message);
  }
}
