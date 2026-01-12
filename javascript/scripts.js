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

document.addEventListener('assign-pot-to-mixer', e => {
  console.log("add thsi oke ")
  const pot = document.getElementById(e.detail.potId);
  if (!pot) return;

  mixer.addPot(pot);
});


document.addEventListener("add-ingredient-to-pot", (e) => {
  console.log("ingredients")
  const { ingredientId, potId } = e.detail;

  const ingredient = ingredientStore.getById(ingredientId);
  const pot = document.getElementById(potId);

  if (!pot || !ingredient) return;

  pot.addIngredient(ingredient);
});
