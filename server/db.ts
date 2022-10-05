import * as admin from "firebase-admin";
import * as serviceAccount from "../key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: process.env.DATABASE_URL,
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { rtdb, firestore };
