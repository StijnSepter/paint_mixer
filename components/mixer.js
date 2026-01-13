import { hexToRgb, averageRGB } from "../javascript/color.js"

class PaintMixer extends HTMLElement {
  constructor() {
    super();
    this.pot = null;
    this.speed = 1;
    this.baseTime = 30;
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

  /* ---------- get color value ---------- */

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


  getMixTime() {
    if (!this.ingredients.length) return 0;
    return Math.max(...this.ingredients.map((i) => i.mixTime));
  }

  /* ---------- MIXING ---------- */

  addPot(pot) {
    if (this.pot) return;

    this.pot = pot;
    this.state = "mixing";

    pot.classList.add("in-mixer");

    this.updateMixerUI();
    this.startMixing();
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
    this.updateTime();
  }

  /* ---------- CALCULATIONS ---------- */

  calculateMixTime() {
    if (!this.pot || this.pot.ingredients.length === 0) return 0;

    const maxTime = Math.max(...this.pot.ingredients.map((i) => i.mixTime));
    const speedLimit = Math.min(
      ...this.pot.ingredients.map((i) => i.maxMixSpeed)
    );

    return Math.round(maxTime / Math.min(this.speed, speedLimit));
  }

  updateTime() {
    const time = this.calculateMixTime();
    this.querySelector(".mix-time").textContent =
      this.state === "mixing" ? "Mixing..." : `${time} sec`;

    this.updateMixerUI();
  }

  /* ---------- UI ---------- */

  updateMixerUI() {
  const slot = this.querySelector(".mixer-pot-slot");
  const dot = this.querySelector(".status-dot");
  const circle = this.querySelector(".color-circle");
  const value = this.querySelector(".color-value");

  dot.className = `status-dot ${this.state}`;

  const colorCss = this.getCombinedColorCss();
  if (!colorCss) {
    circle.style.background = "#e5e7eb";
    value.textContent = "--";
  } else {
    circle.style.background = colorCss;
    value.textContent = colorCss;
  }

  if (!this.pot) {
    slot.innerHTML = `<span class="empty">Drop pot here</span>`;
    return;
  }

  slot.innerHTML = `
    <div><strong>Pot ${this.pot.id.slice(0, 4)}</strong></div>
    <div>Ingredients: ${this.pot.ingredients.length}/3</div>
    <div>Mix time: ${this.calculateMixTime()} sec</div>
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
          <div>Speed: <strong>${this.speed} RPM</strong></div>
          <div>Base time: <strong>${this.baseTime} sec</strong></div>
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
