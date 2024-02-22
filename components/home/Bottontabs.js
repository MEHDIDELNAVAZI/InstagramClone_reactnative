import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";

function Bottontabs({ setselectedtab, selectedtab, navigation, useremail }) {
  const user = auth.currentUser;
  const [userdata, setuserdata] = useState(null);
  async function getUserData() {
    try {
      const userref = doc(db, "users", user.email);
      const docSnap = await getDoc(userref);
      if (docSnap.exists) {
        setuserdata(docSnap.data());
        console.log(docSnap.data().profileimage);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  }
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <SafeAreaView style={styles.bottomtabs}>
        <TouchableOpacity
          onPress={() => {
            setselectedtab("Home");
          }}
        >
          <Ionicons
            name={selectedtab === "Home" ? "home" : "home-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setselectedtab("Explorer");
          }}
        >
          {selectedtab === "Search" ? (
            <Ionicons name="search-circle-sharp" size={35} color="white" />
          ) : (
            <Ionicons name="search-circle-outline" size={35} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Addnewpost", {
              useremail: useremail,
            });
          }}
        >
          <EvilIcons name="plus" size={35} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setselectedtab("Reels");
          }}
        >
          {selectedtab === "Reels" ? (
            <FontAwesome name="video-camera" size={24} color="white" />
          ) : (
            <Feather name="video" size={24} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setselectedtab("Profile");
          }}
        >
          {userdata ? (
            <Image
              style={
                selectedtab === "Profile"
                  ? [styles.profileimage, styles.activeprofileimage]
                  : styles.profileimage
              }
              source={{
                uri: userdata.profileimage,
              }}
            />
          ) : (
            <ActivityIndicator color="white" />
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
export default Bottontabs;

const styles = StyleSheet.create({
  bottomtabs: {
    position: "absolute",
    alignItems: "center",
    borderWidth: 1,
    bottom: 30 ,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "black",
    zIndex: 200,
    width: "100%",
  },
  profileimage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  activeprofileimage: {
    borderWidth: 2,
    borderColor: "white",
  },
});
