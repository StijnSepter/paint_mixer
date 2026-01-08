export const mixerStore = {
  mixers: [],

  add(mixer) {
    this.mixers.push(mixer);
    this.save();
  },

  save() {
    localStorage.setItem('mixers', JSON.stringify(this.mixers));
  },

  load() {
    const saved = localStorage.getItem('mixers');
    if (saved) this.mixers = JSON.parse(saved);
  },

  getAll() {
    return this.mixers;
  }
};
