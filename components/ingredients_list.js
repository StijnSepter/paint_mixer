import { ingredientStore } from "../store/ingredient_store.js";

class IngredientSidebar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.addEventListener("submit", this.createIngredient.bind(this));
    this.addEventListener("click", this.handleAddClick.bind(this));
  }

  createIngredient(e) {
    e.preventDefault();

    const ingredient = {
      id: crypto.randomUUID(),
      name: this.querySelector('[name="name"]').value,
      maxMixSpeed: Number(this.querySelector('[name="speed"]').value),
      mixTime: Number(this.querySelector('[name="time"]').value),
      color: this.querySelector('[name="color"]').value,
      structure: this.querySelector('[name="structure"]').value,
    };


    ingredientStore.add(ingredient);
    this.render();
  }

  handleAddClick(e) {
    if (!e.target.matches(".btn-add-ingredient")) return;

    const id = e.target.dataset.id;
    this.dispatchEvent(
      new CustomEvent("add-ingredient-to-bucket", {
        bubbles: true,
        detail: { id },
      })
    );
  }

  render() {
    this.innerHTML = `
      <section class="sidebar-section">
        <h3 class="section-title">Create Ingredient</h3>
        
        <form class="ingredient-form">
          <div class="form-group">
              <label>Ingredient Name</label>
              <input name="name" placeholder="e.g., Titanium White" required />
          </div>

          <div class="form-group">
              <label>Mix Speed</label>
              <input name="speed" type="number" placeholder="RPM" required />
          </div>

          <div class="form-group">
              <label>Mix Time</label>
              <input name="time" type="number" placeholder="Seconds" required />
          </div>

          <div class="form-group">
              <label>Structure</label>
              <select name="structure">
                <option value="grainy">Grainy</option>
                <option value="coarse">Coarse</option>
                <option value="smooth">Smooth</option>
                <option value="slimy">Slimy</option>
              </select>
          </div>

          <div class="form-group">
              <label>Ingredient Color</label>
              <input name="color" type="color" class="color-input" />
          </div>

          <button type="submit" class="btn-create-ingredient">Create Ingredient</button>
        </form>

        <hr class="divider" />

        <h3 class="section-title">Inventory</h3>
        <ul class="ingredient-list">
          ${ingredientStore
            .getAll()
            .map(
              (i) => `
            <li draggable="true" data-id="${i.id}" class="ingredient-item">
              <div class="ingredient-info">
                  <span class="ingredient-swatch" style="background-color: ${i.color}"></span>
                  <span class="ingredient-name">${i.name}</span>
              </div>
              <button class="btn-add-indicator" data-id="${i.id}">Add</button>
            </li>
          `
            )
            .join("")}
        </ul>
      </section>
    `;

    // makes the list items dragable
    this.addEventListener("dragstart", (e) => {
      if (!e.target.matches(".ingredient-item")) return;
      e.dataTransfer.setData("ingredient-id", e.target.dataset.id);
    });

    this.addEventListener("click", (e) => {
      if (!e.target.matches(".btn-add-ingredient")) return;

      const ingredientId = e.target.dataset.id;

      document.dispatchEvent(
        new CustomEvent("ingredient-selected", {
          detail: { ingredientId },
        })
      );
    });
  }
}

customElements.define("ingredient-sidebar", IngredientSidebar);
