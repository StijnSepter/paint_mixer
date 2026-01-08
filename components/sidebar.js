class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <h2 class="sidebar-title">Add ingredients</h2>
        
        <ingredient-sidebar></ingredient-sidebar>

        <section class="sidebar-section">
          <h3>Mixers</h3>

          <div id="mixer-container"></div>

          <button id="add-mixer">+ New Mixer</button>
          <paint-mixer></paint-mixer>
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
    this.querySelector("#add-mixer").addEventListener("click", () => {
      this.querySelector("#mixer-container").appendChild(
        document.createElement("paint-mixer")
      );
    });
  }
}

customElements.define("app-sidebar", AppSidebar);
