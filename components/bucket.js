class AddPaintPot extends HTMLElement {
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
                <input type="number" class="pot-input" placeholder="0">
                <span class="unit">ml</span>
            </div>
        </div>
        <div class="input-field">
            <label class="section-label">Outdoor Temp</label>
            <div class="unit-wrapper">
                <input type="number" class="pot-input" placeholder="0">
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

    // Update the list of names in the input field
    inputDisplay.value = this.ingredients.map((i) => i.name).join(", ");

    if (this.ingredients.length >= 3) {
      // Pot is Full Logic
      this.classList.add("pot-full");
      indicatorText.textContent = "Pot Full";
      indicatorIcon.textContent = "✓";

      // Update badge style for "Full" state
      indicator.style.backgroundColor = "#f3f4f6";
      indicator.style.color = "#9ca3af";
      indicator.style.borderColor = "#d1d5db";
    } else {
      // Room for more logic
      this.classList.remove("pot-full");
      indicatorText.textContent = "Room for more";
      indicatorIcon.textContent = "+";
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
