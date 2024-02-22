import { Dimensions, StyleSheet } from "react-native";
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

export default function Commentslider() {
  const windowHeight = Dimensions.get("window").height;
  const position = useSharedValue(windowHeight);
  const flingGesture = Gesture.Fling()
    .direction(Directions.DOWN)
    .onEnd((e) => {
      position.value = withTiming(position.value + 400, { duration: 400 });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: position.value - 400 }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1, zIndex: 500 }}>
      <GestureDetector gesture={flingGesture}>
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  box: {
    height: 400,
    width: "100%",
    backgroundColor: "gray",
    borderRadius: 20,
    marginBottom: 30,
  },
});
