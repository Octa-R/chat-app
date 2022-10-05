import * as admin from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";
const isDev = process.env.NODE_ENV === "development";
import * as serviceAccount from "../key.json";
if (isDev) {
  initializeApp({
    credential: cert(serviceAccount as any),
    databaseURL: process.env.DATABASE_URL,
  });
} else {
  initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG || "")),
    databaseURL: process.env.DATABASE_URL,
  });
}

const firestore = admin.firestore();
const rtdb = admin.database();

export { rtdb, firestore };
