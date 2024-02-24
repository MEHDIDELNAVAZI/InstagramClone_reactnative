import { StyleSheet, View, Image, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Skeletonloading from "../skeleton";
import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";

export default function Posts() {
  const [posts, setposts] = useState(null);
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);
  async function getpostdata() {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", user.email, "posts")
      );
      const postData = [];
      querySnapshot.forEach((doc, index) => {
        postData.push({
          id: index,
          data: doc.data(), // Assuming doc.data() represents the data of the post
        });
      });
      setData(postData);

      setloading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getpostdata();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getpostdata();
    }, [])
  );

  return (
    <>
      {loading ? (
        <Skeletonloading />
      ) : (
        <FlatList
          data={data}
          numColumns={3}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 2 }}>
              <Image
                source={{ uri: item.data.imageUrl }}
                style={[
                  styles.image,
                  { width: Dimensions.get("window").width / 3 - 1 },
                ]}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
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
