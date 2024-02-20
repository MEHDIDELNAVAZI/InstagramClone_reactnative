import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/userprofile/Header";
import Userprofileimage from "../components/userprofile/userprofileimage";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function Userprofile() {
  const user = auth.currentUser;
  const [userdata, setuserdata] = useState(null);
  async function getUserData() {
    try {
      const userref = doc(db, "users", user.email);
      const docSnap = await getDoc(userref);
      if (docSnap.exists) {
        setuserdata(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View>
      <Header username={userdata && userdata.usernmae} />
      <Userprofileimage />
    </View>
  );
}
const styles = StyleSheet.create({});
