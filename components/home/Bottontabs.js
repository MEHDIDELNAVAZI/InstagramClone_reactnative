import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import app from "../../firebase";
import { getAuth } from "firebase/auth";

function Bottontabs({ setselectedtab, selectedtab, navigation, useremail }) {
  const [userprofileimage, setuserprofileimage] = useState(null);
  const db = getFirestore(app);

  // async function getUserProfileImage(emailUser) {
  //   const q = query(collection(db, "users"), where("email", "==", emailUser));
  //   const querySnapshot = await getDocs(q);
  //   if (!querySnapshot.empty) {
  //     querySnapshot.forEach((doc) => {
  //       const userData = doc.data();
  //       const userProfileImage = userData.profileimage;
  //       setuserprofileimage(userProfileImage);
  //     });
  //   } else {
  //     console.log("No matching documents.");
  //   }
  // }

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
          {userprofileimage ? (
            <Image
              style={
                selectedtab === "Profile"
                  ? [styles.profileimage, styles.activeprofileimage]
                  : styles.profileimage
              }
              source={{
                uri: { userprofileimage },
              }}
            />
          ) : (
            <Text
              style={{
                color: "white",
              }}
            >
              laoding
            </Text>
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
    bottom: 0,
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
