class AddPaintPot extends HTMLElement {
  get paintQuantity() {
    return Number(this.querySelectorAll(".pot-input")[0]?.value) || 0;
  }

  get temperature() {
    return Number(this.querySelectorAll(".pot-input")[1]?.value) || 0;
  }
  connectedCallback() {
    // ✅ 1. Ensure unique ID
    if (!this.id) {
      this.id = crypto.randomUUID();
    }

    this.ingredients = [];

    this.shortId = this.id.slice(0, 4);

    this.classList.add("pot");

    this.setAttribute("draggable", "true");

    this.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("pot-id", this.id);
      e.dataTransfer.effectAllowed = "move";
    });

    this.innerHTML = `
      <div class="paint-pot-card">
          <div class="pot-header">
              <span class="pot-title">Paint Pot ${this.shortId}</span>
              <button class="btn-remove" title="Remove Pot">✕</button>
          </div>

          <div class="section">
              <label class="section-label">Input Ingredients</label>
              <div class="ingredient-drop-container">
                  <input type="text" class="pot-input-display" placeholder="Drag ingredients here..." disabled>
                  <div class="drag-indicator">
                      <span class="icon">+</span>
                      <span class="text">Room for more</span>
                  </div>
              </div>
          </div>

          <div class="section grid-2">
            <div class="input-field">
                  <label class="section-label">Paint Quantity</label>
                  <div class="unit-wrapper">
                      <input type="number" class="pot-input" placeholder="200">
                      <span class="unit">ml</span>
                  </div>
              </div>
              <div class="input-field">
                  <label class="section-label">Outdoor Temp</label>
                  <div class="unit-wrapper">
                      <input type="number" class="pot-input" placeholder="20">
                      <span class="unit">°C</span>
                  </div>
              </div>
          </div>

          <button class="assign-mixer">Assign to Mixer</button>

          <hr class="divider">

          <div class="section result-section">
              <label class="section-label">Mixing Result</label>
              <div class="result-card">
                  <div class="result-row">
                      <span class="result-label">Mixing Time</span>
                      <span class="result-value text-blue">-- min</span>
                  </div>
                  <div class="result-row">
                      <span class="result-label">Resulting Color</span>
                      <div class="result-color-group">
                          <div class="color-preview"></div>
                          <span class="result-value text-blue">#------</span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    `;

    /* ---------- EVENTS ---------- */

    this.querySelector(".assign-mixer").addEventListener("click", () =>
      this.assignToMixer()
    );

    // delete
    this.querySelector(".btn-remove").addEventListener("click", () =>
      this.remove()
    );

    // Drag & Drop
    this.addEventListener("dragover", (e) => e.preventDefault());

    this.addEventListener("drop", (e) => {
      e.preventDefault();
      this.classList.remove("drag-over", "drag-denied");

      if (this.ingredients.length >= 3) {
        alert("This pot already has 3 ingredients");
        return;
      }

      const ingredientId = e.dataTransfer.getData("ingredient-id");
      if (!ingredientId) return;

      document.dispatchEvent(
        new CustomEvent("add-ingredient-to-pot", {
          detail: {
            ingredientId,
            potId: this.id,
          },
        })
      );
    });

    this.addEventListener("dragenter", () => {
      if (this.ingredients.length < 3) {
        this.classList.add("drag-over");
      } else {
        this.classList.add("drag-denied");
      }
    });

    this.addEventListener("dragleave", () => {
      this.classList.remove("drag-over", "drag-denied");
    });
  }

  addIngredient(ingredient) {
    if (this.ingredients.length >= 3) {
      alert("A pot can contain max 3 ingredients");
      return;
    }

    this.ingredients.push(ingredient);
    this.renderIngredients();
  }

  renderIngredients() {
    const inputDisplay = this.querySelector(".pot-input-display");
    const indicator = this.querySelector(".drag-indicator");
    const indicatorText = indicator.querySelector(".text");
    const indicatorIcon = indicator.querySelector(".icon");

    // ---- INGREDIENT NAMES ----
    inputDisplay.value = this.ingredients.map((i) => i.name).join(", ");

    // ---- POT CAPACITY UI ----
    if (this.ingredients.length >= 3) {
      this.classList.add("pot-full");
      indicatorText.textContent = "Pot Full";
      indicatorIcon.textContent = "✓";

      indicator.style.backgroundColor = "#f3f4f6";
      indicator.style.color = "#9ca3af";
      indicator.style.borderColor = "#d1d5db";
    } else {
      this.classList.remove("pot-full");
      indicatorText.textContent = "Room for more";
      indicatorIcon.textContent = "+";
    }

    // ---- MIX RESULT UI (only if inside mixer) ----
    const timeEl = this.querySelector(".result-row .result-value");
    const colorPreview = this.querySelector(".color-preview");
    const colorText = this.querySelector(".result-color-group span");

    if (this.mixer) {
      // <-- only if this pot has been assigned to a mixer
      const mixTime = this.mixer.calculateMixTime(); // use the mixer to calculate
      const colorCss = this.mixer.getCombinedColorCss();

      timeEl.textContent = mixTime ? `${mixTime} sec` : "--";

      if (colorCss) {
        colorPreview.style.background = colorCss;
        colorText.textContent = colorCss;
      } else {
        colorPreview.style.background = "#e5e7eb";
        colorText.textContent = "#------";
      }
    } else {
      // Pot not yet in a mixer → show defaults
      timeEl.textContent = "--";
      colorPreview.style.background = "#e5e7eb";
      colorText.textContent = "#------";
    }
  }

  assignToMixer() {
    document.dispatchEvent(
      new CustomEvent("assign-pot-to-mixer", {
        detail: { potId: this.id },
      })
    );
  }
}

customElements.define("add-paint-pot", AddPaintPot);
