import { potStore } from '../store/bucket_store.js';

/* Ingredient selected via sidebar click */
document.addEventListener('ingredient-selected', e => {
  const { ingredientId } = e.detail;
});

/* Canonical add ingredient handler */
document.addEventListener('add-ingredient-to-pot', e => {
  const { potId, ingredientId } = e.detail;

  potStore.addIngredient(potId, ingredientId);
});
