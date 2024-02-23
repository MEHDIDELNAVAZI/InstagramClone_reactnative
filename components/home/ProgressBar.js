import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    height: 4, // Adjusted height
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  progressText: {
    marginLeft: 5,
    color: "#333",
    fontSize: 10, // Adjusted font size
  },
});
