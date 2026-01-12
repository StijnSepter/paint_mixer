class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <h2 class="sidebar-title">Add ingredients</h2>
        
        <ingredient-sidebar></ingredient-sidebar>

        <section class="sidebar-section">
          <h3>Mixers</h3>

          <div id="hall-container">
            <div id="hall-1" class="hall"></div>
            <div id="hall-2" class="hall" style="display:none;"></div>
          </div>

          <button id="switch-hall">Switch Hall</button>
          <button id="add-mixer">+ New Mixer</button>
        </section>



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

customElements.define("app-sidebar", AppSidebar);
