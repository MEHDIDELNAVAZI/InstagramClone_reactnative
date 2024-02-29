import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function LoadingComponent() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/instagram.png")}
        style={{
          height: 150,
          width: 150,
        }}
      />
      <View
        style={{
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>From Meta</Text>

        <Image
          source={require("../assets/meta-icon.png")}
          style={{
            height: 30,
            width: 30,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
  },
  gradient: {
    padding: 10, // Adjust padding as needed
    borderRadius: 5, // Optional: adds border radius
  },
  text: {
    color: "white",
    fontSize: 20,
  },
});
