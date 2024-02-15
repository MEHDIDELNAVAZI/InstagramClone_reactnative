import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

function Bottontabs() {
  const [activetab, setactivetab] = useState("Home");
  return (
    <>
      <View style={styles.bottomtabs}>
        <TouchableOpacity
          onPress={() => {
            setactivetab("Home");
          }}
        >
          <Ionicons
            name={activetab === "Home" ? "home" : "home-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setactivetab("Search");
          }}
        >
          {activetab === "Search" ? (
            <Ionicons name="search-circle-sharp" size={35} color="white" />
          ) : (
            <Ionicons name="search-circle-outline" size={35} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setactivetab("Reels");
          }}
        >
          {activetab === "Reels" ? (
            <FontAwesome name="video-camera" size={24} color="white" />
          ) : (
            <Feather name="video" size={24} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setactivetab("Shop");
          }}
        >
          {activetab === "Shop" ? (
            <Entypo
              name="shopping-cart"
              size={24}
              color="white"
              style={styles.icons}
            />
          ) : (
            <AntDesign name="shoppingcart" size={24} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setactivetab("profile");
          }}
        >
          <Image
            style={
              activetab === "profile"
                ? [styles.profileimage, styles.activeprofileimage]
                : styles.profileimage
            }
            source={{
              uri: "https://randomuser.me/api/portraits/women/20.jpg",
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
export default Bottontabs;

const styles = StyleSheet.create({
  bottomtabs: {
    position: "absolute",
    alignItems: "center",
    borderWidth: 1,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    height: 50,
    backgroundColor: "black",
    zIndex: 200,
    width: "100%",
  },
  profileimage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  activeprofileimage: {
    borderWidth: 2,
    borderColor: "white",
  },
});
