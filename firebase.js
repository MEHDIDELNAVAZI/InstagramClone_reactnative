import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const storage = getStorage(app);
var db = getFirestore(app);
export { db, auth, app, storage };
