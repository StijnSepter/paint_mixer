class AddPaintPot extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="paint-pot-card">
    <div class="pot-header">
        <span class="pot-title">Paint Pot # 1</span>
        <button class="btn-remove">Remove Pot</button>
    </div>

    <div class="section">
        <label class="section-label">Input Colors</label>
        <div class="input-group-container">
            <div class="input-row">
                <input type="text" value="#FF0000" class="pot-input">
                <button class="btn-add">Add Color</button>
            </div>
            <div class="input-row">
                <input type="text" value="rgb(0,255,0)" class="pot-input">
                <button class="btn-add">Add Color</button>
            </div>
        </div>
    </div>

    <div class="section grid-2">
        <div>
            <label class="section-label">Paint Quantity (ml):</label>
            <input type="number" value="150" class="pot-input">
        </div>
        <div>
            <label class="section-label">Outdoor Temperature (°C):</label>
            <input type="number" value="22" class="pot-input">
        </div>
    </div>

    <hr class="divider">

    <div class="section">
        <label class="section-label">Mixing Result</label>
        <div class="result-row">
            <span class="result-label">Final Mixing Time:</span>
            <span class="result-value text-blue">15 min</span>
        </div>
        <div class="result-row">
            <span class="result-label">Resulting Color:</span>
            <div class="color-preview" style="background-color: #808000;"></div>
            <span class="result-value text-blue">#808000 (RGB/HEX)</span>
        </div>
    </div>
</div>

    `;
  }
}

customElements.define('add-paint-pot', AddPaintPot);
