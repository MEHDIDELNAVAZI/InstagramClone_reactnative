import { useReducer } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
import { FlatList } from "react-native-gesture-handler";

export default function Skeletonloading() {
  const [dark, toggle] = useReducer((s) => !s, true);
  const colorMode = dark ? "dark" : "light";
  function renderposts(item) {
    return (
      <View
        style={{
          marginTop: 10,
        }}
      >
        <Spacer height={8} />
        <Skeleton colorMode={colorMode} width={"100%"} height={150} />
      </View>
    );
  }
  const skeletondata = Array(6).fill(0);
  return (
    <Pressable onPress={toggle} style={styles.container}>
      <MotiView
        transition={{
          type: "timing",
        }}
        style={[styles.container, styles.padded]}
        animate={{ backgroundColor: dark ? "#000000" : "#ffffff" }}
      >
        <Spacer />
        <FlatList
          data={skeletondata}
          renderItem={renderposts}
          keyExtractor={(item, index) => String(index)}
          numColumns={2}
        />
      </MotiView>
    </Pressable>
  );
}

const Spacer = ({ height = 16 }) => <View style={{ height }} />;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  padded: {
    padding: 16,
  },
});
