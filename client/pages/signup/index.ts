import { Router } from "@vaadin/router";
import { state } from "../../state";
class SignUpPage extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }
  addListeners() {
    const registerBtn = <HTMLElement>this.shadow.querySelector(".register");
    registerBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      type FormData = {
        name: string;
        email: string;
      };
      const form = <HTMLFormElement>this.shadow.querySelector(".form");
      const data = new FormData(form);
      const formData: FormData = { name: "", email: "" };
      for (const [name, value] of data) {
        formData[name] = value;
      }
      const validEmail = this.validateEmail(formData.email);
      const validName = this.validateName(formData.name);
      if (validEmail && validName) {
        console.log("datos validos");
        state.createUser(formData);
        alert("usuario creado con éxito");
        Router.go("/");
      } else {
        if (validEmail) {
          console.error("nombre menor a 4 caracteres");
        } else {
          console.error("email inválido");
        }
      }
    });

    const comeBackBtn = <HTMLElement>this.shadow.querySelector(".btn-volver");
    comeBackBtn.addEventListener("click", (evt) => {
      evt.preventDefault();
      Router.go("/");
    });
  }
  validateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  validateName(name: string): boolean {
    return name.length >= 4 ? true : false;
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
      .register {
        margin-top:20px;
      }
      .btn-volver {
        margin-bottom:20px;
      }
    `;
    this.shadow.innerHTML = `
    <div class="container">
      <x-header class="header"></x-header>
      <form class="form">
        <x-btn text="Volver" class="btn-volver"></x-btn>

        <label class="label" for="email" >E-mail</label>
        <input type="email" name="email" required/>

        <label for="name" class="label" required>tu nombre</label>
        <input type="text" name="name" required>

        <x-btn text="Registrarse" class="register"></x-btn>
      </form>
    <div>
    `;
    this.addListeners();
    this.shadow.appendChild(style);
  }
}
customElements.define("sign-up", SignUpPage);
