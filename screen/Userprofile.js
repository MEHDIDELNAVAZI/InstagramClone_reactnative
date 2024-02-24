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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <SafeAreaView>
        <StatusBar style="light"/>
        <Header username={userdata && userdata.usernmae} />
        <Userprofileimage />
      </SafeAreaView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({});
