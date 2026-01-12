class PaintMixer extends HTMLElement {
  constructor() {
    super();
    this.pot = null; // ONE bucket only
    this.speed = 1;
    this.baseTime = 30;
  }

  connectedCallback() {
    this.render();

    this.querySelector('.speed')
      .addEventListener('input', e => {
        this.speed = Number(e.target.value);
        this.updateTime();
      });

    this.querySelector('.base-time')
      .addEventListener('input', e => {
        this.baseTime = Number(e.target.value);
        this.updateTime();
      });
  }

  addPot(pot) {
    if (this.pot) return; // already occupied

    this.pot = pot;
    this.updateTime();
  }

  calculateMixTime() {
    if (!this.pot || this.pot.ingredients.length === 0) return 0;

    let maxTime = 0;

    this.pot.ingredients.forEach(ing => {
      maxTime = Math.max(maxTime, ing.mixTime);
    });

    const speedFactor =
      Math.min(this.speed, Math.min(...this.pot.ingredients.map(i => i.maxMixSpeed)));

    return Math.round(maxTime / speedFactor);
  }


  updateTime() {
    this.querySelector('.mix-time').textContent =
      `${this.calculateMixTime()} sec`;
  }

  startMixing() {
  if (!this.pot) return;

  const mixTime = this.calculateMixTime();

  if (mixTime === 0) return;

  setTimeout(() => {
    // Mixing finished
    this.finishMixing();
  }, mixTime * 1000);
}

finishMixing() {
  if (!this.pot) return;

  // Mark pot as mixed (state only for now)
  this.pot.isMixed = true;

  // Remove pot from mixer
  this.pot = null;

  // Update UI
  this.updateTime();
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
          Base time
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
