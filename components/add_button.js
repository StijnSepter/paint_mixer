class AddPaintPotButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="add-pot-button">
        + Add New Paint Pot
      </button>
    `;

    this.querySelector('button').addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('add-pot', { bubbles: true })
      );
    });
  }
}

customElements.define('add-button', AddPaintPotButton);
