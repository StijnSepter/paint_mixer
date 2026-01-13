class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <div class="sidebar-content">
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
        </div>
      </aside>
    `;
  }
}

customElements.define("app-sidebar", AppSidebar);
