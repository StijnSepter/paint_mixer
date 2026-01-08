export const potStore = {
  pots: [],

  getById(id) {
    return this.pots.find(p => p.id === id);
  }
};
