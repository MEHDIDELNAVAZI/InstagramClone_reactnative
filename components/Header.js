import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Image source={require("../assets/instalogo.png")} style={styles.logo} />
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <AntDesign name="hearto" size={24} style={styles.icons} />
        <AntDesign name="pluscircleo" size={24} style={styles.icons} />
        <View
          style={{
            position: "relative",
          }}
        >
          <FontAwesome name="comment-o" size={26} style={styles.icons} />
          <Text
            style={{
              position: "absolute",
              bottom: 8,
              color: "white",
              backgroundColor: "red",
              textAlign: "center",
              height: 16,
              width: 16,
              right: 6,
              borderRadius: 3,
            }}
          >
            7
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icons: {
    marginRight: 15,
    color: "white",
  },
  logo: {
    width: 100,
    height: 20,
  },
});
