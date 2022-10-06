import { Message } from "../../types/message";
import { state } from "../../state";
const sendImg = require("url:./send.svg");
class Chat extends HTMLElement {
  messages: Message[];
  shadow: ShadowRoot;
  constructor() {
    super();
    this.messages = [];
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.render();
    state.subscribe(() => {
      const cs = state.getState();
      this.messages = cs.messages;
      this.render();
    });
  }
  addListeners() {
    const form = this.shadow.querySelector(".submit-message");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const target = e.target as any;
      const newMessage = target["new-message"].value;
      state.pushMessage(newMessage);
    });
  }

  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .container {
        box-sizing:border-box;
        height:100vh;
        display:grid;
        grid-template-columns: 0.5fr 6fr 0.5fr;
        grid-template-rows: 60px auto ;

        grid-template-areas: 
          "header header header"
          ". chat ."
      }
      .chat {
        box-sizing:border-box;
        grid-area:chat;
        display:flex;
        margin-top:20px;
        height:90%;
        max-height:90%;
        flex-direction:column;
        justify-content:space-between;
        border:solid 4px var(--grey);
        border-radius:5px;
        padding:15px;
        width:675px;
        max-width:650px;
        min-width:300px;
        justify-self:center;

      }
      x-header {
        grid-area:header;
      }
      .button {
        box-sizing:border-box;
        padding:0;
        height: 55px;
        min-width:55px;
        border-radius:100%;
        border:none;
        background-color: var(--grey);
        cursor:pointer;
      }
      .submit-message {
        display:flex;
        align-items: center;
        justify-content:center;
        gap:30px;
        border-top:2px solid var(--grey);
        padding-top:15px;
      }
      .submit-message > input {
        width:100%;
        border-radius:4px;
        border:none;
        height:35px;
        font-size:22px;
      }
      .msg-container {
        height:100%;
        max-height:800px;
        display:flex;
        flex-direction:column;
        gap:15px;
        overflow: scroll;
        overflow-x: hidden;
        padding-right: 15px;
        margin-bottom:20px;
      }
      #style-1::-webkit-scrollbar-track
      {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #000;
      }

      #style-1::-webkit-scrollbar
      {
        width: 12px;
        background-color: #F5F5F5;
      }

      #style-1::-webkit-scrollbar-thumb
      {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
      }
    `;

    this.shadow.innerHTML = `
      <div class="container">
        <x-header></x-header>
        <div class="chat">
          <div class="msg-container" id="style-1">
            ${this.messages
              .map((m) => {
                return `
                  <x-message
                    from="${m.from}"
                    message="${m.message}"
                  > 
                  </x-message>`;
              })
              .join("")}
          </div>
          <form class="submit-message">
            <input type="text" name="new-message">
            <button class="button">
              <img src="${sendImg}"/>
            </button>
          </form>
        </div>
      </div>
    `;
    this.shadow.appendChild(style);
    this.addListeners();
  }
}
customElements.define("chat-page", Chat);
