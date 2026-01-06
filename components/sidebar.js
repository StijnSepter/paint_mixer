class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <h2 class="sidebar-title">Functions & Parameters</h2>
        
        <ingredient-sidebar></ingredient-sidebar>

        <section class="sidebar-section">
          <h3>Environmental Factors</h3>

          <label>
            Humidity (%)
            <input type="number" value="60">
          </label>

          <label>
            UV Index
            <input type="number" value="5">
          </label>
        </section>
      </aside>
    `;
  }
}

customElements.define('app-sidebar', AppSidebar);
