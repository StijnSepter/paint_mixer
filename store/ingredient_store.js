export const ingredientStore = {
  ingredients: [],

  add({ id, name, color, structure, maxMixSpeed, mixTime }) {
    if (!id || !name) {
      throw new Error("Ingredient must have id and name");
    }

    this.ingredients.push({
      id,
      name,
      color,
      structure,
      maxMixSpeed: maxMixSpeed, // same here
      mixTime: mixTime 
    });
  },

  getAll() {
    return this.ingredients;
  },

  getById(id) {
    return this.ingredients.find(i => i.id === id);
  }
};
