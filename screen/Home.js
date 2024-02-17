import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Bottontabs from "../components/home/Bottontabs";
import Posts from "../components/home/Posts";

function Home({ navigation }) {
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Header navigation={navigation} />
        <Stories />
        <Posts />
        <Bottontabs />
      </SafeAreaView>
    </>
  );
}
export default Home;
