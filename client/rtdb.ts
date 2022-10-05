import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
var firebaseConfig = {
  apiKey: "ieYlf4z8g3ppt9bjbi5rFadrZL8VLwAJNzM8KvtD",
  databaseURL: "https://apx-mod-6-67f2e-default-rtdb.firebaseio.com/",
  authDomain: "apx-mod-6-67f2e.firebaseapp.com",
  // projectId: "apx-mod-6-67f2e",
  // The value of `databaseURL` depends on the location of the database
  // storageBucket: "PROJECT_ID.appspot.com",
  // messagingSenderId: "SENDER_ID",
  // appId: "APP_ID",
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  // measurementId: "G-MEASUREMENT_ID",
};
const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
export { rtdb };
