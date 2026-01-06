document.addEventListener('add-pot', () => {
  console.log('Add new paint pot');

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
