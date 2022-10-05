class CustomHeader extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const div = document.createElement("div");
    div.classList.add("header");
    const style = document.createElement("style");

    style.textContent = `
        .header {
          background-color: var(--color-2);
          margin:0;
          height: 60px;
          display:flex;
          justify-content: center;
          align-items: center;
          font-size: 22px;
          font-weight: 500;
        }
      `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(div);
  }
}

customElements.define("x-header", CustomHeader);
