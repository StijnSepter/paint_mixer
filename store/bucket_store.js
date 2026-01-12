export const potStore = {
  pots: [],

  getById(id) {
    return this.pots.find(p => p.id === id);
  },

  addIngredient(potId, ingredientId) {
    const pot = this.getById(potId);
    if (!pot) return;

    pot.ingredientIds.push(ingredientId);
  }
};
