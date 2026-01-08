class AddPaintPotButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="add-pot-button">
        + Add New Paint Pot
      </button>
    `;

    this.querySelector("button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("assign-pot-to-mixer", {
          bubbles: true,
          detail: { pot: this },
        })
      );
    });
  }
}

customElements.define("add-button", AddPaintPotButton);
