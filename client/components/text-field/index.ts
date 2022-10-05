export function initTextField() {
  class Text extends HTMLElement {
    shadow: ShadowRoot;
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
      this.render();
    }
    render() {
      const label = this.getAttribute("label");

      const style = document.createElement("style");
      style.innerHTML = `
        .root {
          display:flex;
          flex-direction:column;
        }
        .label {
          font-size:18px;
          width:600px;
        }
        .input {
          height:45px;
          box-sizing: border-box;
          width:100%;
          padding: 17px 13px;
          font-size:18px;
          border: solid 2px black;
          border-radius: 4px;
        }
      `;

      this.shadow.innerHTML = `
        <div class="root">
          <label class="label">
            ${label}
          </label>
          <input class="input" type="text" placeholder="Ingrese su ${label}">
        </div>
      `;
      this.shadow.appendChild(style);
    }
  }

  customElements.define("text-field", Text);
}
