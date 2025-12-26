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

function addToLog(location, enemy = null) {
  try {
    const gameLog = document.getElementById("game-log");

    if (!gameLog) {
      throw new Error("Поле лога не найдено");
    }

    const logEntry = document.createElement("p");

    logEntry.classList.add("log-entry");

    if (enemy !== null) {
      logEntry.textContent = `Вы осуществили переход в локацию ${location}. Вас атакует: ${enemy}!!!`;
    } else {
      logEntry.textContent = `Вы осуществили переход в локацию ${location}`;
    }

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
      throw new Error('Поле логов не найдено')
    }

    if (logEntrys.length === 0) {
      throw new Error('Логи не найдены')
    }

    logEntrys.forEach((log) => {
      gameLog.removeChild(log);
    });
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
      enemyPanel.style.display = "block"
      updateEnemyStats();

      const combatActions = document.getElementById('combat-actions');
      combatActions.style.display = 'block';

    } else {
      enemyPanel.style.display = "none"
    }

    
  } catch (error) {
    console.log("Подробности:", error.message);
  }
}

function updateEnemyStats() {
  try {
    if (!gameState.currentEnemy) {
      console.log('Нет врага');
      return
    }

    const enemyName = document.getElementById('enemy-name');
    const enemyHp = document.getElementById('enemy-hp');
    const enemyHealthBar = document.getElementById('enemy-health-bar');
    const enemyAttack = document.getElementById("enemy-attack");
    const enemyDefense = document.getElementById("enemy-defense");

    const percentage = (gameState.currentEnemy.hp / gameState.currentEnemy.maxHp) * 100;
    const maxHp = gameState.currentEnemy.maxHp || gameState.currentEnemy.hp;

    if (!enemyName || !enemyHp || !enemyHealthBar || !enemyAttack || !enemyDefense) {
      throw new Error('Найдены не все элементы');
    }

    enemyName.textContent = gameState.currentEnemy.name;
    enemyHp.textContent = `${gameState.currentEnemy.hp}/${maxHp}`;
    enemyAttack.textContent = gameState.currentEnemy.attack;
    enemyDefense.textContent = gameState.currentEnemy.defense;
    enemyHealthBar.style.width = percentage + "%";

  } catch (error) {
    console.log(`Ошибка: ${error.message}`);
  }
}