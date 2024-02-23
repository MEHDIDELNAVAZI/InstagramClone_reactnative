import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Skeletonloading from "../skeleton";

export default function Posts({ posts }) {
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  useEffect(() => {
    console.log("hey useeffect called");
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

  return (
    <>
      {loading ? (
        <Skeletonloading />
      ) : (
        <>
          {data.map((item, indexed) => {
            return (
              <View
                style={{
                  marginLeft: 2,
                }}
              >
                <Image
                  source={{ uri: item.data.imageUrl }}
                  style={[
                    styles.image,
                    { width: Dimensions.get("window").width / 3 - 1 },
                    // Adjusted width for two columns
                  ]}
                />
              </View>
            );
          })}
        </>
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
    height: 100, // Adjust as needed
    marginBottom: 2,
  },
});
