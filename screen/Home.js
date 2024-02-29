import React, { useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Posts from "../components/home/Posts";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import { useProgress } from "../context/ProgressContext";
import ProgressBar from "../components/home/ProgressBar";

function Home({ navigation }) {
  const [useremail, setemailuser] = useState();
  const { progress, progressisactive } = useProgress();
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "black",
        }}
      >
        <Header />
        <Stories />
        {progressisactive && <ProgressBar progress={progress} />}
        <Posts />
      </SafeAreaView>
    </>
  );
}
export default Home;
