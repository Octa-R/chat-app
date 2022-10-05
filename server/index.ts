import * as express from "express";
const port = process.env.PORT || 3000;
const app = express();
const isDev = process.env.NODE_ENV === "development";
import dotenv from "dotenv";
if (isDev) {
  dotenv.config();
}
app.use(express.json());
app.use(express.static("public"));

import {
  getNewRoom,
  sendMessage,
  getRtdbRoomId,
  userSignUp,
  userAuth,
} from "./controllers";

const roomsRouter = express.Router();
const usersRouter = express.Router();

roomsRouter.post("/:roomId/messages", sendMessage);
roomsRouter.post("/", getNewRoom);
roomsRouter.get("/:roomId", getRtdbRoomId);
app.use("/rooms", roomsRouter);

usersRouter.post("/signup", userSignUp);
usersRouter.post("/auth", userAuth);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`listening http://localhost:${port}`);
});
