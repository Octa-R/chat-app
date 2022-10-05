const API_URL_BASE = "http://localhost:3000";
import { rtdb } from "./rtdb";
import { ref, onValue } from "firebase/database";
import { Storage } from "./types/storage";
import { Router } from "@vaadin/router";
import map from "lodash/map";
export const state = {
  data: {
    userId: "",
    userName: "",
    email: "",
    messages: [],
    rtdbRoomId: "",
    roomId: "",
  },
  listeners: [],
  storage: new Storage(),
  init() {
    const cs = state.getState();
    Router.go(location.pathname);
    // console.log("se leyo el state del storage", cs);
    this.setState({ ...this.data, ...cs });
    if (cs.rtdbRoomId && cs.userId) {
      this.accessRoom();
      Router.go("/chat");
    }
  },
  getState() {
    const data = this.storage.get("chat-state");
    return data;
  },
  setState(newState) {
    // console.log("soy el state eh cambiado: ", newState);
    this.data = newState;
    this.storage.save("chat-state", this.data);
    for (const cb of this.listeners) {
      cb();
    }
  },
  setRoomId(roomId: string) {
    const cs = this.getState();
    cs.roomId = roomId;
    this.setState(cs);
  },
  subscribe(callback) {
    this.listeners.push(callback);
  },
  setNombre(nombre) {
    const lastState = this.getState();
    lastState.nombre = nombre;
    this.storage.save("nombre", { nombre });
    this.setState(lastState);
  },
  getName() {
    const lastState = this.getState();
    return lastState.nombre;
  },
  async pushMessage(message: string) {
    const cs = this.getState();
    if (!cs.roomId) {
      console.error("falta roomId");
      return;
    }

    const res = await fetch(`${API_URL_BASE}/rooms/${cs.roomId}/messages`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: cs.userId, message: message }),
    });
    const data = await res.json();
    if (data.ok) {
      console.log("data ok", data);
      cs.messages.push({ from: cs.name, message: message });
      this.setState(cs);
    } else {
      console.error(data);
    }
  },
  setEmailAndName(email: string, name: string) {
    const cs = this.getState();
    cs.name = name;
    cs.email = email;
    this.setState(cs);
  },
  // se ejecuta cuando se presiona comenzar
  //primero hay que setear los datos
  async signIn(cb) {
    const cs = this.getState();
    if (cs.email) {
      const response = await fetch(`${API_URL_BASE}/users/auth`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: cs.email }),
      });
      const data = await response.json();
      if (!data.ok) {
        cb(data);
        return;
      }
      cs.userId = data.id;
      this.setState(cs);
      cb();
    } else {
      cb({ ok: false, message: "falta email" });
    }
  },
  // genera un nuevo room
  async askNewRoom() {
    const cs = this.getState();
    if (!cs.userId) {
      console.error("no hay userId en el state");
      return;
    }
    const res = await fetch(API_URL_BASE + "/rooms", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: cs.userId }),
    });
    const data = await res.json();
    // console.log(" data que llega en ask new room", data);
    cs.roomId = data.roomId;
    console.log("state con nuevo roomid", cs);
    this.setState(cs);
  },
  //accede, obtiene el rtdbRoomId
  async accessRoom() {
    const cs = this.getState();
    const res = await fetch(
      `${API_URL_BASE}/rooms/${cs.roomId}?userId=${cs.userId}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log("se obtuvo la data  del server", data);
    cs.rtdbRoomId = data.rtdbRoomId;
    this.setState(cs);
    this.listenRoom();
  },
  // se queda escuchando a los cambios de la rtdb
  listenRoom() {
    console.log("entro a listen room");
    const cs = this.getState();
    console.log("rooms" + cs.rtdbRoomId);
    const chat = ref(rtdb, `/rooms/${cs.rtdbRoomId}`);
    onValue(chat, (snapShot) => {
      console.log("detecto cambio de valor en listenRoom");
      const cs = this.getState();
      const messagesFromServer = snapShot.val();
      console.log("messages from server", messagesFromServer);
      const messagesList = map(messagesFromServer.messages);
      cs.messages = messagesList;
      console.log(`escuchando room: ${cs.rtdbRoomId}`);
      console.log(messagesList);
      this.setState(cs);
    });
  },
  async createUser(userData: any) {
    const res = await fetch(`${API_URL_BASE}/users/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    console.log(data);
  },
};
