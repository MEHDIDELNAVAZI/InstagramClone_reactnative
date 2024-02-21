import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAYvISJALRTWOxRCMr516R3AYeAvbAd2Yo",
  authDomain: "rninstagramclone.firebaseapp.com",
  projectId: "rninstagramclone",
  storageBucket: "rninstagramclone.appspot.com",
  messagingSenderId: "416862737995",
  appId: "1:416862737995:web:13548419824ababdee1fce",
  storageBucket: "gs://rninstagramclone.appspot.com",
};
// Initialize Firebase
var app = initializeApp(firebaseConfig);
const authProvider = app.container.getProvider("auth-exp");
let auth;
if (authProvider.isInitialized()) {
  auth = authProvider.getImmediate();
} else {
  auth = getAuth(app);
}
const storage = getStorage(app);
var db = getFirestore(app);
export { db, auth, app, storage };
