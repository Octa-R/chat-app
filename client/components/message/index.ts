class TextMessage extends HTMLElement {
  shadow: ShadowRoot;
  sender: string;
  textMessage: string;
  owner: boolean;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.sender = this.getAttribute("from") || "undefinded";
    this.textMessage = this.getAttribute("message") || "undefinded";
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const style = document.createElement("style");
    style.innerHTML = `
        .root {
          font-family: 'Roboto', sans-serif;
          display:flex;
          flex-direction:column;
          width:fit-content;
          height:45px;
          color:#eee;
          font-weight:500;
        }
        .sender {
          font-size:10px;
        }
        .message {
          padding: 2px;
          font-size:22px;
          border-radius:4px;
        }
        .own-message {
          align-self: flex-end;

        }
      `;

    this.shadow.innerHTML = `
        <div class="root">
          <div class="sender">
            ${this.sender}
          </div>
          <div class="message ${this.owner ? "own-message" : ""}">
            ${this.textMessage}
          </div>
        </div>
      `;
    this.shadow.appendChild(style);
  }
}

customElements.define("x-message", TextMessage);
