let characters = {};
let charactersIcon = {};
let charactersFound = 0;

function updateCharacters(newData) {
  characters = newData;
}

function isCharacterFound(character, x, y) {
  const area = characters[character];

  return (
    x >= area.x &&
    x <= area.x + area.width &&
    y >= area.y &&
    y <= area.y + area.height
  );
};

function updateCharactersIcon() {
  charactersIcon = Object.fromEntries(
    Object.keys(characters).map((name) => [name, document.getElementById(`${name}-icon`)])
  );
}

function highlightCharacterIcon(name) {
  const img = charactersIcon[name];

  if (!img) return;
  charactersFound += 1;
  
  img.classList.add('highlighted');
  checkVictory();
}

function resetAllCharacterIcons() {
  charactersFound = 0;
  
  Object.values(charactersIcon).forEach((icon) => {
    icon.classList.remove('highlighted');
  });
}

function checkVictory() {
  const charactersLength = Object.values(characters).length;

  if (charactersFound === charactersLength) {
    console.log('Victory!');
    displayVictoryModal();
  }
}

function displayVictoryModal() {
  const gameContainer = document.getElementById('game-container');
  const modal = document.createElement('div');

  modal.innerHTML = 'Congratulations, you found everyone! Go back to pick a different image.';
  modal.classList.add('centered');
  modal.classList.add('victory-modal');

  gameContainer.appendChild(modal);
}

function removeVictoryModal() {
  const victoryModal = document.querySelector('.victory-modal');

  if (victoryModal) {
    victoryModal.parentNode.removeChild(victoryModal);
  }
}

export {
  characters,
  updateCharacters,
  updateCharactersIcon,
  isCharacterFound,
  highlightCharacterIcon,
  resetAllCharacterIcons,
  removeVictoryModal,
};
