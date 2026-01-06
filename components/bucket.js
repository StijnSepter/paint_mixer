class AddPaintPot extends HTMLElement {
  static count = 0;

  ingredients = [];
  addIngredient(ingredient) {
    this.ingredients.push({ ...ingredient }); // creates a clone of the ingredient
    this.renderIngredients();
  }

  renderIngredients() {
    const container = this.querySelector(".input-group-container");
    container.innerHTML = this.ingredients
      .map(
        (i) => `
      <div class="input-row">
        <input value="${i.color}" disabled />
        <span>${i.structure}</span>
      </div>
    `
      )
      .join("");
  }
  connectedCallback() {
    AddPaintPot.count++;

    this.innerHTML = `
    <div class="paint-pot-card">
        <div class="pot-header">
           <span class="pot-title">Paint Pot #${AddPaintPot.count}</span>
            <button class="btn-remove">Remove Pot</button>
        </div>

        <div class="section">
            <label class="section-label">Input Colors</label>
            <div class="input-group-container">
                <div class="input-row">
                    <input type="text" value="" class="pot-input">
                    <button class="btn-add">Add Color</button>
                </div>
                <div class="input-row">
                    <input type="text" value="" class="pot-input">
                    <button class="btn-add">Add Color</button>
                </div>
            </div>
        </div>

        <div class="section grid-2">
            <div>
                <label class="section-label">Paint Quantity (ml):</label>
                <input type="number" value="" class="pot-input">
            </div>
            <div>
                <label class="section-label">Outdoor Temperature (°C):</label>
                <input type="number" value="" class="pot-input">
            </div>
        </div>

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
  }
}

customElements.define("add-paint-pot", AddPaintPot);
