class AppSidebar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <aside class="sidebar">
        <h2 class="sidebar-title">Functions & Parameters</h2>

        <section class="sidebar-section">
          <h3>Global Settings</h3>

          <label>
            Default Quantity (ml)
            <input type="number" value="100">
          </label>

          <label>
            Mixing Efficiency
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
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

customElements.define('app-sidebar', AppSidebar);
