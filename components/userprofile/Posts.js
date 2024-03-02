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
import { disableNetwork } from "firebase/firestore";

function Posts() {
  const user = auth.currentUser;
  const [data, setData] = useState([]);
  const [error, setError] = useState("null");
  const [loading, setLoading] = useState(true);

  async function getPostData() {
    await disableNetwork(db);
    try {
      const querySnapshot = await getDocs(
        collection(db, "users", user.email, "posts")
      );
      const postData = [];
      querySnapshot.forEach((doc, index) => {
        postData.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setData(postData);
      setLoading(false);
    } catch (error) {
      if (error.code === "unavailable") {
        // Firestore is in offline mode
        console.log("Offline mode: Retrieving data from cache...");
        const cachedQuerySnapshot = await getDocsFromCache(
          collection(db, "users", user.email, "posts")
        );
        const postData = [];
        cachedQuerySnapshot.forEach((doc, index) => {
          postData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setData(postData);
        setLoading(false);
      } else {
        // Other errors
        console.error("Error fetching data:", error);
        console.log("Hey there is an error fetching data");
      }
    }
  }

  useEffect(() => {
    getPostData();
  }, []);

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
    <View>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
          <TouchableOpacity onPress={handleReload}>
            <Text style={styles.reloadText}>Reload</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Skeletonloading />
        </View>
      ) : (
        <FlatList
          data={data}
          numColumns={3}
          style={{}}
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
