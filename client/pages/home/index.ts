import { Router } from "@vaadin/router";
import { state } from "../../state";
class HomePage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  addListeners() {
    const form: any = <HTMLElement>this.shadow.querySelector(".form");
    const select = <HTMLSelectElement>this.shadow.querySelector(".select");

    const button = this.shadow.querySelector(".btn-comenzar");

    button?.addEventListener("click", (e) => {
      e.preventDefault();
      const name: string = form.name.value;
      const email: string = form.email.value;
      state.setEmailAndName(email, name);
      state.signIn(async (err: any) => {
        console.log("entro a la callback");
        if (!err) {
          const opcion = select.value;
          if (opcion === "nuevo") {
            console.log("se selecciono un room nuevo");
            await state.askNewRoom();
          }
          if (opcion === "existente") {
            const roomIdInput = <HTMLInputElement>(
              this.shadow.querySelector(".room-id")
            );
            const roomId = roomIdInput.value;
            state.setRoomId(roomId);
          }
          await state.accessRoom();
          Router.go("/chat");
        } else {
          console.error(err);
        }
      });
    });

    select.addEventListener("change", (evt: any) => {
      const { value } = evt.target;
      const roomIdInput = <HTMLInputElement>(
        this.shadow.querySelector(".room-id")
      );
      if (value === "nuevo") {
        roomIdInput.disabled = true;
      } else if (value === "existente") {
        roomIdInput.disabled = false;
      }
    });
    const btnRegister = <HTMLElement>this.shadow.querySelector(".btn-register");
    btnRegister.addEventListener("click", (evt) => {
      evt.preventDefault();
      Router.go("/signup");
    });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const style = document.createElement("style");
    style.innerHTML = `
      .container {
        height:100vh;
        display:grid;
        grid-template-columns: 1fr 2fr 1fr;
        grid-template-rows: 60px auto ;
        grid-template-areas: 
          "header header header"
          ". form ."
      }
      .form {
        color:var(--orange);
        height:auto;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:10px;
        grid-area:form;
        align-self:center;
      }
      .form > input {
        box-sizing:border-box;
        width:312px;
        height:55px;
        grid-area:form;
        border-radius:4px;
        border:solid 2px black;

      }
      .label {
        font-size:22px;
        text-align:left;
        width:312px;
        margin:0;
      }

      .header{
        grid-area:header;
      }

      .select{
        width:312px;
        height:55px;
        font-size:22px;
        border-radius:4px;
        border:solid 2px black;
      }
      .btn {
        margin-top:20px;
      }
    `;
    this.shadow.innerHTML = `
    <div class="container">
      <x-header class="header"></x-header>
      <form class="form">
        <x-btn text="Registrarse" class="btn-register"></x-btn>
        <label class="label" for="email" >E-mail</label>
        <input type="email" name="email" />

        <label for="name" class="label">tu nombre</label>
        <input type="text" name="name">

        <label class="label" for="opciones">Room:</label>
        <select name="opciones" class="select">
          <option value="nuevo">Nuevo Room</option>
          <option value="existente">Room Existente</option>
        </select>

        <label class="label" for="room-id">Room-Id:</label>
        <input class="room-id" type="text" name="room-id" disabled="true" />

        <x-btn text="Comenzar" class="btn-comenzar"></x-btn>
      </form>
    <div>
    `;
    this.addListeners();
    this.shadow.appendChild(style);
  }
}
customElements.define("home-page", HomePage);
