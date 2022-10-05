import "./components/header";
import "./components/button";
import "./components/text-field";
import "./components/message";
import "./pages/chat";
import "./pages/home";
import "./pages/signup";
import "./router";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import { state } from "./state";
(async () => {
  state.init();
  console.log(state.getState());
})();
