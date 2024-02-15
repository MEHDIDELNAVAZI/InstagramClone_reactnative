import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { EvilIcons } from "@expo/vector-icons";

export default function Header({ navigation }) {
  return (
    <SafeAreaView
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Image
          source={require("../../assets/instalogo.png")}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          padding: 10,
        }}
      >
        <TouchableOpacity>
          <EvilIcons name="heart" size={35} style={styles.icons} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigation.push('Addnewpost')
        }}>
          <EvilIcons name="plus" size={35} style={styles.icons} />
        </TouchableOpacity>
        <View
          style={{
            position: "relative",
          }}
        >
          <TouchableOpacity>
            <EvilIcons name="comment" size={35} style={styles.icons} />
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: -4,
              color: "white",
              backgroundColor: "red",
              textAlign: "center",
              alignItems: "center",
              height: 14,
              width: 23,
              right: 0,
              borderRadius: 5,
              zIndex: 100,
            }}
          >
            <Text style={{ color: "white", fontSize: 13 }}>11</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  icons: {
    color: "white",
  },
  logo: {
    width: 100,
    height: 20,
    marginLeft: 10,
  },
});
