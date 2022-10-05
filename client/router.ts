import { Router } from "@vaadin/router";
const router = new Router(document.getElementById("root"));
router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/chat", component: "chat-page" },
  { path: "/signup", component: "sign-up" },
]);

export { router };
