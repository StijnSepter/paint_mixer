export const ingredientStore = {
  ingredients: [],

  add(ingredient) {
    this.ingredients.push(ingredient);
  },

  getAll() {
    return this.ingredients;
  },

  getById(id) {
    return this.ingredients.find(i => i.id === id);
  }
};
