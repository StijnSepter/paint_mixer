import { potStore } from '../store/bucket_store.js';

class PaintMixer extends HTMLElement {
  constructor() {
    super();
    this.pots = [];
    this.speed = 1;
    this.baseTime = 30;
  }

  connectedCallback() {
    this.render();

    this.querySelector('.speed').addEventListener('input', e => {
      this.speed = Number(e.target.value);
      this.updateTime();
    });

    this.querySelector('.base-time').addEventListener('input', e => {
      this.baseTime = Number(e.target.value);
      this.updateTime();
    });
  }

  addPot(pot) {
    this.pots.push(pot);
    this.updateTime();
  }

  calculateMixTime(mixer) {
    const pots = mixer.potIds
    .map(id => potStore.getById(id))
    .filter(Boolean);

    if (this.pots.length === 0) return 0;

    let totalFactor = 0;
    let ingredientCount = 0;

    this.pots.forEach(pot => {
      pot.ingredients.forEach(ing => {
        totalFactor += ing.mixFactor ?? 1;
        ingredientCount++;
      });
    });

    const avgFactor = ingredientCount ? totalFactor / ingredientCount : 1;

    return Math.round((this.baseTime * avgFactor) / this.speed);
  }

  updateTime() {
    this.querySelector('.mix-time').textContent =
      `${this.calculateMixTime()} sec`;
  }

  render() {
    this.innerHTML = `
      <div class="mixer-card">
        <strong>Mixer</strong>

        <label>
          Speed
          <input type="number" step="0.1" value="${this.speed}" class="speed">
        </label>

        <label>
          Base time (sec)
          <input type="number" value="${this.baseTime}" class="base-time">
        </label>

        <div>
          Mixing time:
          <strong class="mix-time">0 sec</strong>
        </div>
      </div>
    `;
  }
}

customElements.define('paint-mixer', PaintMixer);
