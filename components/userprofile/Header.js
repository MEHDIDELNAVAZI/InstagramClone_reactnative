import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Header = React.memo(({ username }) => {
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
            fontSize: 20,
          }}
        >
          {username ? username : <ActivityIndicator color="white" />}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity>
            <AntDesign name="plussquareo" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="menu" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({});
