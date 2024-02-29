import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useRef } from "react";
import Header from "../components/userprofile/Header";
import Userprofileimage from "../components/userprofile/userprofileimage";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Dimensions, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useFetchUser from "../Hooks/Useuserdata";

export default function Userprofile() {
  const { userData } = useFetchUser();
  const popupanim = useRef(new Animated.Value(1)).current;
  const popup = () => {
    // Will change popupanim value to 1 in 5 seconds
    Animated.timing(popupanim, {
      toValue: 1, // change from 0 to 1
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  const popout = () => {
    // Will change popupanim value to 1 in 5 seconds
    Animated.timing(popupanim, {
      toValue: 0, // change from 0 to 1
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            transform: [
              {
                translateY: popupanim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get("window").height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={popout}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.fadingText}>Edit Profile</Text>
          <Text></Text>
        </View>
      </Animated.View>

      <StatusBar style="light" />
      <Header username={userData && userData.usernmae} />
      <Userprofileimage profileimage={userData && userData.profileimage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fadingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 45,
    height: Dimensions.get("window").height, // Adjust the height as needed
    backgroundColor: "black",
    zIndex: 4000,
  },
  fadingText: {
    fontSize: 18,
    color: "white",
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
