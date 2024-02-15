import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

function Postheader({ imageUri, username }) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        marginTop: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: imageUri }} style={styles.profileimage} />
        <Text style={styles.profilename}>{username}</Text>
      </View>
      <View>
        <Feather name="more-horizontal" size={24} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileimage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    borderWidth: 2,
    borderColor: "#F57D1F",
  },
  profilename: {
    fontSize: 13,
    color: "white",
  },
});
export default Postheader;
