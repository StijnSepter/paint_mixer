export const hallStore = {
  currentHall: 'hall-1', // 🔹 current hall tracked globally
  halls: [
    { id: 'hall-1', mixers: [] },
    { id: 'hall-2', mixers: [] }
  ],

  switchHall() {
    this.currentHall = this.currentHall === 'hall-1' ? 'hall-2' : 'hall-1';
  },

  addMixerToHall(mixer) {
    const hall = this.halls.find(h => h.id === this.currentHall);
    if (!hall) return false;
    if (hall.mixers.length >= 5) return false;
    hall.mixers.push(mixer);
    return true;
  },

  getCurrentHall() {
    return this.halls.find(h => h.id === this.currentHall);
  },

  getCurrentHallMixers() {
    return this.getCurrentHall()?.mixers ?? [];
  }
};
