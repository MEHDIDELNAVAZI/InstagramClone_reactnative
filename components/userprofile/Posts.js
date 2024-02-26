import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import Skeletonloading from "../skeleton";
import { auth, db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useFocusEffect } from "@react-navigation/native";
import PostretreiveError from "./PostretreiveError";
import { useImageUpload } from "../../context/Doesimageuplouded";
import { err } from "react-native-svg";

function Posts() {
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isImageUploaded } = useImageUpload();

   function getPostData() {
    getDocs(collection(db, "users", user.email, "posts"))
      .then((querySnapshot) => {
        const postData = [];
        querySnapshot.forEach((doc, index) => {
          postData.push({
            id: index,
            data: doc.data(),
          });
        });
        setData(postData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error retrieving data:", error); // Log the error
        setError(error.message); // Set the error state with the error message
        setLoading(false);
        throw error;
      });
  }
  useEffect(() => {
    getPostData();
  }, []);

  useEffect(() => {
    console.log("sdcsd shut up vibosdcnjasd ckasdc");
  }, [error]);

  useFocusEffect(
    React.useCallback(() => {
      // Here you can call getPostData again if necessary
    }, [])
  );

  const handleReload = () => {
    setLoading(true); // Show loading indicator
    setError(null); // Reset error state
    getPostData(); // Fetch data again
  };

  return (
    <View
      style={{
        backgroundColor: "black",
      }}
    >
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity onPress={handleReload}>
            <Text style={styles.reloadText}>Reload</Text>
          </TouchableOpacity>
        </View>
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
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    height: 400,
  },
  errorText: {
    color: "white",
    marginBottom: 10,
  },
  reloadText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Posts;
