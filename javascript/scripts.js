import { ingredientStore } from "../store/ingredient_store.js";

const mixer = document.querySelector('paint-mixer');

// creates a new pot when you click on the button "+ add new paint pot"
document.addEventListener("add-pot", () => {
  const container = document.getElementById("pot-container");
  container.appendChild(document.createElement("add-paint-pot"));
});

document.addEventListener('add-ingredient-to-bucket', (e) => {
  const { id } = e.detail;
  const ingredient = ingredientStore.getById(id);

  const pot = document.querySelector('add-paint-pot:last-of-type');
  pot.addIngredient(ingredient);
});

document.addEventListener("add-ingredient-to-pot", (e) => {
  const { ingredientId, potId } = e.detail;

  const ingredient = ingredientStore.getById(ingredientId);
  const pot = document.getElementById(potId);

  if (!pot || !ingredient) return;

  pot.addIngredient(ingredient);
});


document.addEventListener('assign-pot-to-mixer', e => {
  const pot = document.getElementById(e.detail.potId);
  if (!pot) return;

  const hallMixers = hallStore.getCurrentHallMixers();
  if (!hallMixers.length) return;

  // Assign to the first available mixer
  const mixer = hallMixers.find(m => !m.pot);
  if (!mixer) {
    alert("No available mixer in this hall");
    return;
  }

  mixer.addPot(pot);
});
