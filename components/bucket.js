class AddPaintPot extends HTMLElement {
  connectedCallback() {
    // ✅ 1. Ensure unique ID
    if (!this.id) {
      this.id = crypto.randomUUID();
    }

    this.ingredients = [];

    this.shortId = this.id.slice(0, 4);

    this.classList.add("pot");

    this.innerHTML = `
      <div class="paint-pot-card">
        <div class="pot-header">
         <span class="pot-title">Paint Pot ${this.shortId}</span>
          <button class="btn-remove">Remove Pot</button>
        </div>

        <div class="section">
          <label class="section-label">Input ingredients</label>
          <div class="input-group-container">
            <div class="input-row">
              <input type="text" class="pot-input" disabled>
              <button class="btn-add">Add ingredients</button>
            </div>
          </div>
        </div>

        <div class="section grid-2">
          <div>
            <label class="section-label">Paint Quantity (ml):</label>
            <input type="number" class="pot-input">
          </div>
          <div>
            <label class="section-label">Outdoor Temperature (°C):</label>
            <input type="number" class="pot-input">
          </div>
        </div>

        <button class="assign-mixer">Assign to Mixer</button>

        <hr class="divider">

        <div class="section">
          <label class="section-label">Mixing Result</label>
          <div class="result-row">
            <span class="result-label">Final Mixing Time:</span>
            <span class="result-value text-blue"></span>
          </div>
          <div class="result-row">
            <span class="result-label">Resulting Color:</span>
            <div class="color-preview"></div>
            <span class="result-value text-blue"></span>
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

    this.addEventListener("dragenter", () => {
      if (this.ingredients.length < 3) {
        this.classList.add("drag-over");
      } else {
        this.classList.add("drag-denied");
      }
    });

    this.classList.remove("drag-over", "drag-denied");

    this.addEventListener("drop", (e) => {
      e.preventDefault();

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
      }
    });

    this.addEventListener("dragleave", () => {
      this.classList.remove("drag-over");
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
    const input = this.querySelector(".pot-input");
    const addBtn = this.querySelector(".btn-add");

    input.value = this.ingredients.map((i) => i.name).join(", ");

    if (this.ingredients.length >= 3 && addBtn) {
      addBtn.disabled = true;
      addBtn.classList.add("btn-disabled");
    }

    if (this.ingredients.length >= 3) {
      this.classList.add("pot-full");
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
