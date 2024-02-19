import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYvISJALRTWOxRCMr516R3AYeAvbAd2Yo",
  authDomain: "rninstagramclone.firebaseapp.com",
  projectId: "rninstagramclone",
  storageBucket: "rninstagramclone.appspot.com",
  messagingSenderId: "416862737995",
  appId: "1:416862737995:web:13548419824ababdee1fce",
};
const app = initializeApp(firebaseConfig);

export default app;
