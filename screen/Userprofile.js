import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../components/userprofile/Header";
import Userprofileimage from "../components/userprofile/userprofileimage";

export default function Userprofile() {
  return (
    <View>
      <Header />
      <Userprofileimage />
    </View>
  );
}
const styles = StyleSheet.create({});
