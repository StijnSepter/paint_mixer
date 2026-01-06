import { ingredientStore } from '../store/ingredient_store.js';

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
      mixingSpeed: Number(this.querySelector('[name="speed"]').value),
      mixingTime: Number(this.querySelector('[name="time"]').value),
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
      <form>
        <input name="name" placeholder="Ingredient name" required />
        <input name="speed" type="number" placeholder="Mix speed" />
        <input name="time" type="number" placeholder="Mix time" />
        <input name="color" type="color" />
        <select name="structure">
          <option value="liquid">Liquid</option>
          <option value="powder">Powder</option>
          <option value="gel">Gel</option>
        </select>
        <button type="submit">Create Ingredient</button>
      </form>

      <hr />

      <ul>
        ${ingredientStore
          .getAll()
          .map(
            (i) => `
          <li>
            ${i.name}
            <button class="btn-add-ingredient" data-id="${i.id}">
              Add
            </button>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }
}

customElements.define("ingredient-sidebar", IngredientSidebar);
