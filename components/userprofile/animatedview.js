import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Text,
  View,
  Button,
  SafeAreaView,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AnimatedView() {
  useEffect(() => {
    console.log("sdsdhsahjbc");
  });
  const popupanim = useRef(new Animated.Value(0)).current;

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
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <SafeAreaView>
      <View style={styles.buttonRow}>
        <Button title="popup view" onPress={popup} />
      </View>
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
    height: Dimensions.get("window").height, // Adjust the height as needed
    backgroundColor: "black",
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
