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
import app from "../../firebase";
import { getAuth, signOut } from "firebase/auth"; // Import the necessary functions from Firebase Authentication

export default function Header({ navigation, useremail }) {
  const handleSignOut = () => {
    const auth = getAuth(app); // Get the authentication service instance
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        // You can perform additional actions after sign-out if needed
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => {
          handleSignOut();
        }}
      >
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
    </View>
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
