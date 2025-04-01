import { characters, isCharacterFound, highlightCharacterIcon } from './detectCharacters.js';
import { imageTags, drawTag } from './drawCharacterTag.js';

const container = document.getElementById('image-container');
const img = document.getElementById('waldo-image');

let translateX = 0;
let translateY = 0;
let scale = 1;

const borderPadding = 80;
let containerWidth, containerHeight, imgWidth, imgHeight, maxTranslateX, maxTranslateY;

let isDragging = false;
let startX, startY, clientX, clientY;

function updateDimensions() {
  translateX = 0;
  translateY = 0;

  containerWidth = container.clientWidth;
  containerHeight = container.clientHeight;
  imgWidth = img.naturalWidth * scale;
  imgHeight = img.naturalHeight * scale;
  maxTranslateX = Math.max(0, imgWidth - containerWidth + borderPadding);
  maxTranslateY = Math.max(0, imgHeight - containerHeight + borderPadding);
}

function attachImageListeners(img) {
  img.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDragging = true;
  
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
    clientX = e.clientX;
    clientY = e.clientY;
    container.style.cursor = 'grabbing';
  });

  img.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
  
    let newTranslateX = e.clientX - startX;
    let newTranslateY = e.clientY - startY;

    translateX = Math.min(borderPadding, Math.max(-maxTranslateX, newTranslateX));
    translateY = Math.min(borderPadding, Math.max(-maxTranslateY, newTranslateY));

    img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
  
    for (const tag of imageTags) {
      tag.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
  });
  
  img.addEventListener('mouseup', (e) => {
    isDragging = false;
  
    if (e.clientX == clientX && e.clientY == clientY) {
      const x = (e.clientX - translateX - container.offsetLeft) / scale;
      const y = (e.clientY - translateY - container.offsetTop) / scale;
  
      console.log('x:', x, 'y:', y);
      
      for (const [name, area] of Object.entries(characters)) {
        if (isCharacterFound(name, x, y)) {
          const tag = drawTag(area, name);
          tag.style.transform = `translate(${translateX}px, ${translateY}px)`;
  
          highlightCharacterIcon(name);
          
          break;
        }
      }
    }
  
    container.style.cursor = 'grab';
  });
}

window.addEventListener('resize', () => {
  updateDimensions();
});

export {
  updateDimensions,
  attachImageListeners,
}
