class Button extends HTMLElement {
  shadow: ShadowRoot;
  text: string;
  constructor() {
    super();
    this.text = this.getAttribute("text") || "text";
    this.shadow = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement("style");
    style.textContent = `
        .btn   {
            width:312px;
            height:55px;
            border-radius: 4px;
            border:none;
            font-size:22px;
            font-weight: 500;
            background-color:var(--color-2);
            color:#eee;
            
        }
      `;

    this.shadow.innerHTML = `
        <button class="btn">
          ${this.text}
        </button>
    `;

    this.shadow.appendChild(style);
  }
}

customElements.define("x-btn", Button);
