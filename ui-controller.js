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

function addToLog(location) {
  try {
    const gameLog = document.getElementById("game-log");

    if (!gameLog) {
      throw new Error("Поле лога не найдено");
    }

    const logEntry = document.createElement("p");

    logEntry.classList.add("log-entry");
    logEntry.textContent = `Вы осуществили переход в локацию ${location}`;

    gameLog.append(logEntry);
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
