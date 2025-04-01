import { characters } from "./detectCharacters";

let imageTags = new Set();

function drawTag(obj, name) {
  const container = document.getElementById('image-container');
  const character = characters[name];
  const tag = document.createElement('div');

  tag.classList.add('image-tag');
  tag.dataset.character = name;
  tag.style.top = `${obj.y}px`;
  tag.style.left = `${obj.x}px`;
  tag.style.width = `${character.width}px`;
  tag.style.height = `${character.height}px`;

  container.appendChild(tag);
  imageTags.add(tag);

  return tag;
}

export {
  imageTags,
  drawTag,
}
