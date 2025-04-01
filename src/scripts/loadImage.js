import { updateDimensions, attachImageListeners } from './imageZoomAndPan.js';
import { updateCharacters, updateCharactersIcon } from './detectCharacters.js';
import { imageMap } from './imageAssets.js';

const gameContainer = document.getElementById('game-container');
const container = document.getElementById('image-container');
const spinner = document.getElementById('loading-spinner');

async function loadImage(picture) {
  gameContainer.style.display = 'flex';
  container.innerHTML = ''; // Remove placeholder;
  spinner.style.display = 'block';

  try {
    const { name, data } = picture;
  
    if (data) {
      updateCharacters(JSON.parse(data));
      updateCharactersIcon();
    } else {
      console.warn('No character data found in picture object');
    }
  
    const image = document.createElement('img');
    image.id = 'waldo-image';
    image.alt = `Where's Waldo puzzle image`;
    image.src = imageMap[name];
  
    image.onload = () => {
      spinner.style.display = 'none';
  
      updateDimensions();
      attachImageListeners(image);
    }
  
    image.onerror = () => {
      console.error(`Failed to load image from: ${picture.url}`);
      spinner.style.display = 'none';
    }
  
    container.appendChild(image);
  } catch (err) {
    console.error('Error during image setup or data processing:', err);
    spinner.style.display = 'none';
  }
}

export { loadImage };
