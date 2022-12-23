import { rtdb, firestore } from "../db";
import { customAlphabet, nanoid } from "nanoid";
const randomRoomId = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4);
const roomsCollection = firestore.collection("rooms");
const usersCollection = firestore.collection("users");

const sendMessage = async (req, res) => {
  const { userId, message } = req.body;
  const { roomId } = req.params;
  if (!userId || !message || !roomId) {
    res.status(400).json({ message: "faltan datos" });
  }
  const userDoc = await usersCollection.doc(userId.toString()).get();
  if (userDoc.exists) {
    const userName = userDoc.data().name;
    const roomDoc = await roomsCollection.doc(roomId.toString()).get();
    if (roomDoc.exists) {
      const data = roomDoc.data();
      const { rtdbRoomId } = data;
      const roomRef = rtdb.ref("rooms/" + rtdbRoomId.toString() + "/messages");
      roomRef.push({ message: message, from: userName, ip: req.ip }, () => {
        res.json({ ok: true, message: "mensaje enviado con éxito" });
      });
    } else {
      res.status(401).json({ ok: false, message: "no existe la room" }); //si el usuario no existe
    }
  } else {
    res.status(401).json({ ok: false, message: "no existe el usuario" }); //si el usuario no existe
  }
};

const getNewRoom = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    res.status(404).json({ error: true, message: "falta userId" });
  }
  const userDoc = await usersCollection.doc(userId.toString()).get();

  if (userDoc.exists) {
    const roomRef = rtdb.ref("rooms/" + nanoid());
    await roomRef.set({ messages: [], owner: userId });
    const roomLongId: string = roomRef.key;
    const roomId: string = randomRoomId();
    await roomsCollection.doc(roomId).set({ rtdbRoomId: roomLongId });
    res.json({ roomId: roomId });
  } else {
    res.status(401).json({ error: true, message: "no existe" });
  }
};

const getRtdbRoomId = async (req, res) => {
  const { userId } = req.query;
  const { roomId } = req.params;
  if (!userId || !roomId) {
    res.status(400).json({ error: true, message: "faltan parametros" });
  }
  const userDoc = await usersCollection.doc(userId.toString()).get();
  if (userDoc.exists) {
    const roomSnap = await roomsCollection.doc(roomId).get();
    const data = roomSnap.data();
    res.json({ rtdbRoomId: data.rtdbRoomId });
  } else {
    res.status(401).json({ error: true, message: "no existe" });
  }
};
export { getRtdbRoomId, getNewRoom, sendMessage };
