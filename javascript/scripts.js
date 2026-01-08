import { mixerStore } from '../store/mixer_store.js';

document.addEventListener('add-pot', () => {
  const container = document.getElementById('pot-container');
  const newPot = document.createElement('add-paint-pot');
  container.appendChild(newPot);
});

document.addEventListener('add-ingredient-to-bucket', (e) => {
  const { id } = e.detail;
  const ingredient = ingredientStore.getById(id);

  const pot = document.querySelector('add-paint-pot:last-of-type');
  pot.addIngredient(ingredient);
});

document.getElementById('add-mixer').addEventListener('click', () => {
    console.log("add new mixer")
  const mixer = document.createElement('paint-mixer');
  document.getElementById('mixer-container').appendChild(mixer);
});


document.addEventListener('assign-pot-to-mixer', (e) => {
  const mixer = document.querySelector('paint-mixer:last-of-type');
  if (!mixer) return;

  mixer.addPot(e.detail.pot);
});


document.addEventListener('assign-pot-to-mixer', (e) => {
  const pot = e.detail.pot;
  const mixer = mixerStore.getAll().at(-1); // last mixer for now
  if (!mixer) return;

  // ✅ store only the ID
  mixer.potIds.push(pot.id);

  // ✅ persist
  mixerStore.save();
});


