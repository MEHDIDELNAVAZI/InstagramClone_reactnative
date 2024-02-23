import { View, Text } from "moti";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, PanResponder } from "react-native";
import {
  Gesture,
  GestureDetector,
  Directions,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function Commentslider({
  showcommentsection,
  setshowcommentsection,
}) {
  const windowHeight = Dimensions.get("window").height;
  const position = useSharedValue(windowHeight);
  const flingGesturedown = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd((e) => {
      position.value = withTiming(position.value + 400, { duration: 400 });
    });
  const flingGestureUp = Gesture.Fling()
    .direction(Directions.UP)
    .onStart((e) => {
      position.value = withTiming(position.value - 400, { duration: 400 });
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value - 400 }],
  }));

  const composed = Gesture.Simultaneous(flingGestureUp, flingGesturedown); //Here

  return (
    <View>
      <GestureHandlerRootView style={{ flex: 1, zIndex: 500 }}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    height: Dimensions.get("window").height,
    width: "100%",
    backgroundColor: "#7F8C8D",
    borderRadius: 20,
    marginBottom: 30,
  },
});
