import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../components/userprofile/Header";
import Userprofileimage from "../components/userprofile/userprofileimage";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

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
      }
    } catch (error) {}
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <StatusBar style="light" />
      <Header username={userdata && userdata.usernmae} />
      <Userprofileimage />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
