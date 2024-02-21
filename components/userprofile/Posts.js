import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Skeletonloading from "../skeleton";

export default function Posts({ posts }) {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    if (posts) {
      setloading(false);
      const postData = [];
      posts.forEach((doc, index) => {
        postData.push({
          id: index,
          data: doc.data(), // Assuming doc.data() represents the data of the post
        });
      });
      setData(postData);
    } else {
    }
  }, [posts]);

  function renderposts({ item, index }) {
    return (
      <Image
        source={{ uri: item.data.imageUrl }}
        style={[
          styles.image,
          { width: Dimensions.get("window").width / 2 },
          // Adjusted width for two columns
        ]}
      />
    );
  }
  return (
    <>
      {loading ? (
        <Skeletonloading />
      ) : (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <FlatList
            data={data}
            renderItem={renderposts}
            keyExtractor={(item, index) => String(index)}
            style={{
              height: 400,
            }}
            numColumns={2}
          />
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  item: {
    width: "48%", // Adjust as needed
    marginBottom: 10,
  },
  image: {
    height: 150, // Adjust as needed
    marginBottom: 5,
    marginTop: 10,
  },
});
