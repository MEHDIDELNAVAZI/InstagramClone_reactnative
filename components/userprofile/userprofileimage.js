import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../userprofile/Header";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import Posts from "./Posts";
import Video from "./Video";
import Contact from "./Contact";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "../../firebase";
import { getAuth } from "firebase/auth";

function Userprofileimage() {
  const [activetab, setactivetab] = useState("Post");
  const [posts, setposts] = useState([]);
  const auth = getAuth(app);
  const user = auth.currentUser;
  const db = getFirestore(app);
  async function getpostdata() {
    const querySnapshot = await getDocs(
      collection(db, "users", user.email, "posts")
    );
    setposts(querySnapshot);
  }
  useEffect(() => {
    getpostdata();
  }, []);
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <View>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefVf1IYhNffMEpd7ho5ElzL-mW_U0XFboJQjvtAF_YQ&s",
            }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              position: "relative",
            }}
          />
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: "blue",
              justifyContent: "center",
              position: "absolute",
              alignItems: "center",
              bottom: 5,
              right: 0,
              borderRadius: 15,
              borderWidth: 4,
              borderColor: "black",
            }}
          >
            <TouchableOpacity>
              <AntDesign name="plus" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 20,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              23
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Posts
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              23
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Following
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
              }}
            >
              23
            </Text>
            <Text
              style={{
                color: "white",
              }}
            >
              Followers
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: 10,
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            height: 40,
            alignContent: "center",
            borderRadius: 5,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.4,
            alignSelf: "flex-start",
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Edit profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: "gray",
            justifyContent: "center",
            width: Dimensions.get("window").width * 0.4,
          }}
        >
          <Text
            style={{
              color: "white",
              alignContent: "center",
            }}
          >
            Share profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 40,
            alignContent: "center",
            borderRadius: 5,
            backgroundColor: "gray",
            justifyContent: "center",
            alignItems: "center",
            width: Dimensions.get("window").width * 0.1,
          }}
        >
          <AntDesign name="adduser" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 5,
          marginTop: 40,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setactivetab("Post");
          }}
          style={[
            {
              width: Dimensions.get("window").width / 3,
              padding: 5,
              alignItems: "center",
            },
            activetab === "Post" && styles.active,
          ]}
        >
          <AntDesign name="table" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setactivetab("Video");
          }}
          style={[
            {
              width: Dimensions.get("window").width / 3,
              padding: 5,
              alignItems: "center",
            },
            activetab === "Video" && styles.active,
          ]}
        >
          <Entypo name="folder-video" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setactivetab("Contact");
          }}
          style={[
            {
              width: Dimensions.get("window").width / 3,
              padding: 5,
              alignItems: "center",
            },
            activetab === "Contact" && styles.active,
          ]}
        >
          <FontAwesome6 name="contact-book" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {activetab === "Post" && <Posts posts={posts} />}
      {activetab === "Video" && <Video />}
      {activetab === "Contact" && <Contact />}
    </>
  );
}
const styles = StyleSheet.create({
  active: {
    borderBottomColor: "white",
    borderWidth: 2,
  },
});
export default Userprofileimage;
