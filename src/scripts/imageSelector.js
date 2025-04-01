import { loadImage } from './loadImage';
import { resetAllCharacterIcons, removeVictoryModal } from './detectCharacters';
import { imageMap } from './imageAssets';

const possibleImages = document.getElementById('possible-images');
const selectImageContainer = document.getElementById('select-image-container');
const gameContainer = document.getElementById('game-container');

async function fetchImages() {
  try {
    const res = await fetch('http://localhost:3000/pictures');
    if (!res.ok) throw new Error(`HTTP error: Status: ${res.status}`);

    const data = await res.json();

    data.pictures.forEach((picture) => {
      const card = createImageCard(picture);

      possibleImages.appendChild(card);
    });

  } catch (err) {
    console.error('Failed to load images: ', err);
  }
}

function createImageCard(img) {
  const card = document.createElement('div');
  const image = document.createElement('img');

  card.classList.add('image-card');
  image.src = imageMap[img.name];

  attachCardListeners(card, img);

  card.appendChild(image);
  
  return card;
}

function attachCardListeners(card, picture) {
  card.addEventListener('click', () => {
    loadImage(picture);
    hideImageSelector();
  });
}

function hideImageSelector() {
  selectImageContainer.style.display = 'none';
}

function showImageSelector() {
  selectImageContainer.style.display = 'flex';
}

function hideGameContainer() {
  gameContainer.style.display = 'none';
}

function attachListenerToBackButton() {
  const button = document.getElementById('back-button');

  button.addEventListener('click', (e) => {
    resetAllCharacterIcons();
    hideGameContainer();
    showImageSelector();
    removeVictoryModal();
  });
}

attachListenerToBackButton();
fetchImages();
