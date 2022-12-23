import "./components/header";
import "./components/button";
import "./components/text-field";
import "./components/message";
import "./pages/chat";
import "./pages/home";
import "./pages/signup";
import "./router";
import "dotenv"

import { state } from "./state";
(async () => {
  state.init();
})();
