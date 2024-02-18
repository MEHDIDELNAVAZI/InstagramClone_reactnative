import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

function Header() {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          user name{" "}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <TouchableOpacity>
            <MaterialIcons name="add-box" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="menu" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({});
