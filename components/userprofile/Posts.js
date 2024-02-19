import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";

export default function Posts({ posts }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (posts) {
      const postData = [];
      posts.forEach((doc) => {
        postData.push(doc.data());
      });
      setData(postData);
    }
  }, [posts]);
  return (
    <ScrollView
      style={{
        marginTop: 10,
        height: 400,
      }}
    >
      {data.map((item, index) => (
        <Image
          source={{ uri: item.imageUrl }}
          style={[
            styles.image,
            { width: Dimensions.get("window").width / 2 - 20 },
          ]}
        />
      ))}
    </ScrollView>
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
  },
});
