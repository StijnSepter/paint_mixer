class AppHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav>
        <h1>Paint mixer</h1>
      </nav>
    `;
  }
}

customElements.define('app-header', AppHeader);
