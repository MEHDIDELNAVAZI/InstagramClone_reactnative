import { StyleSheet, View, Image, Dimensions, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Skeletonloading from "../skeleton";
import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import PostretreiveError from "./PostretreiveError";
import { useImageUpload } from "../../context/Doesimageuplouded";

function Posts() {
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null); // Change Error to error for consistency
  const [loading, setLoading] = useState(true);
  const { isImageUploaded } = useImageUpload();

  async function getPostData() {
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", user.email, "posts")
      );
      const postData = [];
      querySnapshot.forEach((doc, index) => {
        postData.push({
          id: index,
          data: doc.data(),
        });
      });
      setData(postData);
      setLoading(false);
    } catch (error) {
      setError(error); // Set the error state to the caught error
      setLoading(false); // Also set loading to false to stop the loading indicator
    }
  }

  useEffect(() => {
    getPostData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      console.log(isImageUploaded);
      if (isImageUploaded) {
        getPostData();
        console.log("hey new image uplouded");
      }
    }, [])
  );

  return (
    <View
      style={{
        backgroundColor: "black",
      }}
    >
      {error ? (
        <PostretreiveError />
      ) : loading ? (
        <Skeletonloading />
      ) : (
        <FlatList
          data={data}
          numColumns={3}
          style={{
            height: "100%",
          }}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 2 }}>
              <Image
                source={{ uri: item.data.imageUrl }}
                style={[
                  styles.image,
                  {
                    width: Dimensions.get("window").width / 3 - 1,
                  },
                ]}
              />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    marginBottom: 2,
  },
});

export default Posts;
