import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useEffect } from "react";

export default function Explor() {
  useEffect(() => {
    console.log("rendered");
  }, []);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Explor
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
