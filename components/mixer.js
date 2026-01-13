import { hexToRgb, averageRGB } from "../javascript/color.js";

class PaintMixer extends HTMLElement {
  constructor() {
    super();
    this.pot = null;
    this.speed = 0;
    this.baseTime = 0;
    this.state = "idle"; // idle | mixing | done
  }

  connectedCallback() {
    this.render();
    this.enableDragDrop();
    this.updateMixerUI();
  }

  /* ---------- DRAG & DROP ---------- */

  enableDragDrop() {
    this.addEventListener("dragover", (e) => e.preventDefault());

    this.addEventListener("drop", (e) => {
      e.preventDefault();

      if (this.pot) {
        alert("This mixer already contains a pot");
        return;
      }

      const potId = e.dataTransfer.getData("pot-id");
      const pot = document.getElementById(potId);
      if (!pot) return;

      this.addPot(pot);
    });
  }

  /* ---------- COLOR ---------- */

  getCombinedColor() {
    if (!this.pot || !this.pot.ingredients.length) return null;
    const rgbColors = this.pot.ingredients.map(i => hexToRgb(i.color));
    return averageRGB(rgbColors);
  }

  getCombinedColorCss() {
    const c = this.getCombinedColor();
    if (!c) return null;
    return `rgb(${c.r}, ${c.g}, ${c.b})`;
  }

  /* ---------- MIXING ---------- */

  addPot(pot) {
    this.pot = pot;
    this.state = "mixing";
    pot.classList.add("in-mixer");

    // ✅ calculate speed & base time safely
    this.updateFromPot(pot);

    this.updateMixerUI();
    this.startMixing();
  }

  updateFromPot(pot) {
    // ✅ SAFE numeric reads
    const inputs = pot.querySelectorAll(".pot-input");

    const quantity = Number(inputs[0]?.value) || 0;     // ml
    const temperature = Number(inputs[1]?.value) || 0;  // °C

    // ✅ guaranteed numbers
    this.speed = Math.max(100, 500 - quantity * 2 + temperature * 3);
    this.baseTime = Math.max(5, quantity / 10 - temperature / 5);
  }

  startMixing() {
    const mixTime = this.calculateMixTime();
    if (!mixTime) return;

    this.querySelector(".mix-time").textContent = "Mixing...";
    setTimeout(() => this.finishMixing(), mixTime * 1000);
  }

  finishMixing() {
    if (!this.pot) return;

    this.pot.isMixed = true;
    this.pot.classList.remove("in-mixer");
    this.pot.classList.add("mixed");

    this.pot = null;
    this.state = "done";

    this.updateMixerUI();
  }

  /* ---------- CALCULATIONS ---------- */

  calculateMixTime() {
    if (!this.pot || this.pot.ingredients.length === 0) return 0;

    const maxTime = Math.max(...this.pot.ingredients.map(i => i.mixTime));
    const speedLimit = Math.min(...this.pot.ingredients.map(i => i.maxMixSpeed));

    const effectiveSpeed = Math.min(this.speed || 1, speedLimit);

    return Math.round((maxTime + this.baseTime) / effectiveSpeed);
  }

  /* ---------- UI ---------- */

  updateMixerUI() {
    const slot = this.querySelector(".mixer-pot-slot");
    const dot = this.querySelector(".status-dot");
    const circle = this.querySelector(".color-circle");
    const value = this.querySelector(".color-value");

    dot.className = `status-dot ${this.state}`;

    const colorCss = this.getCombinedColorCss();
    circle.style.background = colorCss || "#e5e7eb";
    value.textContent = colorCss || "--";

    if (!this.pot) {
      slot.innerHTML = `<span class="empty">Drop pot here</span>`;
    } else {
      slot.innerHTML = `
        <div><strong>Pot ${this.pot.id.slice(0, 4)}</strong></div>
        <div>Ingredients: ${this.pot.ingredients.length}/3</div>
        <div>Mix time: ${this.calculateMixTime()} sec</div>
      `;
    }

    const info = this.querySelector(".mixer-info");
    info.innerHTML = `
      <div>Speed: <strong>${this.speed} RPM</strong></div>
      <div>Base time: <strong>${this.baseTime} sec</strong></div>
    `;
  }

  render() {
    this.innerHTML = `
      <div class="mixer-card">
        <div class="mixer-header">
          <strong>Mixer ${this.id?.slice(0, 3) ?? ""}</strong>
          <span class="status-dot idle">●</span>
        </div>

        <div class="mixer-pot-slot">
          <span class="empty">Drop pot here</span>
        </div>

        <div class="mixer-info">
          <div>Speed: <strong>0 RPM</strong></div>
          <div>Base time: <strong>0 sec</strong></div>
        </div>

        <label>
          Combined color
          <div class="color-display">
            <span class="color-circle"></span>
            <span class="color-value">--</span>
          </div>
        </label>

        <div class="mixer-status">
          <strong class="mix-time">Ready</strong>
        </div>
      </div>
    `;
  }
}

customElements.define("paint-mixer", PaintMixer);
