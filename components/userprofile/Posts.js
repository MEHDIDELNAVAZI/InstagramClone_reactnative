import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { tuple } from "yup";

export default function Posts({ posts }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (posts) {
      const postData = [];
      posts.forEach((doc, index) => {
        postData.push({
          id: index,
          data: doc.data(), // Assuming doc.data() represents the data of the post
        });
      });
      setData(postData);
    }
  }, [posts]);

  function renderposts({ item }) {
    return (
      <Image
        source={{ uri: item.data.imageUrl }}
        style={[
          styles.image,
          { width: Dimensions.get("window").width / 2 - 20 }, // Adjusted width for two columns
        ]}
      />
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={renderposts}
      keyExtractor={(item, index) => String(index)}
      style={{
        height: 400,
        marginTop: 20,
      }}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-evenly" }}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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
