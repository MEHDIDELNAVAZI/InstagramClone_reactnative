import { useReducer } from "react";
import {
  StyleSheet,
  Pressable,
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

export default function Skeletonloading() {
  function renderposts(item, index) {
    return (
      <View
        style={{
          marginTop: 10,
          marginLeft: index !== 0 ? 3 : 9,
        }}
      >
        <Skeleton
          colorMode={"dark"}
          width={Dimensions.get("window").width / 3 - 9}
          height={100}
        />
      </View>
    );
  }
  const skeletondata = Array(20).fill(0);
  return (
    <Pressable style={styles.container}>
      <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.container]}
        animate={{ backgroundColor: "#000000" }}
      >
        <Spacer />
        <FlatList
          data={skeletondata}
          renderItem={renderposts}
          keyExtractor={(item, index) => String(index)}
          numColumns={3}
        />
      </MotiView>
    </Pressable>
  );
}

const Spacer = ({ height = 20 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
});
