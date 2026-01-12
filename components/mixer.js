class PaintMixer extends HTMLElement {
  constructor() {
    super();
    this.pot = null; // ONE bucket only
    this.speed = 1;
    this.baseTime = 30;
  }

  connectedCallback() {
    this.render();

    this.querySelector(".speed").addEventListener("input", (e) => {
      this.speed = Number(e.target.value);
      this.updateTime();
    });

    this.querySelector(".base-time").addEventListener("input", (e) => {
      this.baseTime = Number(e.target.value);
      this.updateTime();
    });
    this.addEventListener("dragover", (e) => {
      e.preventDefault(); // REQUIRED for drop
    });

    this.addEventListener("drop", (e) => {
      e.preventDefault();

      if (this.pot) {
        alert("This mixer already contains a pot");
        return;
      }

      const potId = e.dataTransfer.getData("pot-id");
      if (!potId) return;

      const pot = document.getElementById(potId);
      if (!pot) return;

      this.addPot(pot);
      this.startMixing();
    });
  }
  addPot(pot) {
    if (this.pot) return;

    this.pot = pot;
    pot.classList.add("in-mixer");

    this.updateMixerUI();
    this.startMixing();
  }

  calculateMixTime() {
    if (!this.pot || this.pot.ingredients.length === 0) return 0;

    let maxTime = 0;

    this.pot.ingredients.forEach((ing) => {
      maxTime = Math.max(maxTime, ing.mixTime);
    });

    const speedFactor = Math.min(
      this.speed,
      Math.min(...this.pot.ingredients.map((i) => i.maxMixSpeed))
    );

    return Math.round(maxTime / speedFactor);
  }

 updateTime() {
  this.querySelector(".mix-time").textContent =
    `${this.calculateMixTime()} sec`;

  this.updateMixerUI();
}


  startMixing() {
  if (!this.pot) return;

  const mixTime = this.calculateMixTime();
  if (!mixTime) return;

  this.classList.add("mixing");
  this.querySelector(".mix-time").textContent = "Mixing...";

  setTimeout(() => this.finishMixing(), mixTime * 1000);
}


  finishMixing() {
  if (!this.pot) return;

  this.pot.isMixed = true;
  this.pot.classList.remove("in-mixer");
  this.pot.classList.add("mixed");

  this.pot = null;
  this.classList.remove("mixing");

  this.updateMixerUI();
  this.updateTime();
}


  updateMixerUI() {
  const slot = this.querySelector(".mixer-pot-slot");

  if (!this.pot) {
    slot.classList.remove("filled");
    slot.innerHTML = `<span class="empty">Drop pot here</span>`;
    return;
  }

  slot.classList.add("filled");
  slot.innerHTML = `
    <div><strong>Pot ${this.pot.id.slice(0, 4)}</strong></div>
    <div>Ingredients: ${this.pot.ingredients.length}/3</div>
    <div>Speed: ${this.speed} RPM</div>
  `;
}


  render() {
    this.innerHTML = `
    <div class="mixer-card">
      <div class="mixer-header">
        <strong>Mixer ${this.id.slice(0, 3)}</strong>
        <span class="status-dot">●</span>
      </div>

      <div class="mixer-pot-slot">
        <span class="empty">Drop pot here</span>
      </div>

      <label>
        Speed (RPM)
        <input type="number" step="0.1" value="${this.speed}" class="speed">
      </label>

      <label>
        Base time (sec)
        <input type="number" value="${this.baseTime}" class="base-time">
      </label>

      <div class="mixer-status">
        <strong class="mix-time">Ready</strong>
      </div>
    </div>
  `;
  }
}

customElements.define("paint-mixer", PaintMixer);
