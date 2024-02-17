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

function Bottontabs() {
  const [activetab, setactivetab] = useState("Home");
  const [userprofileimage, setuserprofileimage] = useState(null);
  const db = getFirestore(app);

  async function getUserProfileImage(emailUser) {
    const q = query(collection(db, "users"), where("email", "==", emailUser));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const userProfileImage = userData.profileimage;
        setuserprofileimage(userProfileImage);
      });
    } else {
      console.log("No matching documents.");
    
    }
  }
  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user !== null) {
      const emailUser = user.email;
      getUserProfileImage(emailUser);
    }
  }, []);


  return (
    <>
      <SafeAreaView style={styles.bottomtabs}>
        <TouchableOpacity
          onPress={() => {
            setactivetab("Home");
          }}
        >
          <Ionicons
            name={activetab === "Home" ? "home" : "home-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setactivetab("Search");
          }}
        >
          {activetab === "Search" ? (
            <Ionicons name="search-circle-sharp" size={35} color="white" />
          ) : (
            <Ionicons name="search-circle-outline" size={35} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setactivetab("Reels");
          }}
        >
          {activetab === "Reels" ? (
            <FontAwesome name="video-camera" size={24} color="white" />
          ) : (
            <Feather name="video" size={24} color="white" />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setactivetab("Shop");
          }}
        >
          {activetab === "Shop" ? (
            <Entypo
              name="shopping-cart"
              size={24}
              color="white"
              style={styles.icons}
            />
          ) : (
            <AntDesign name="shoppingcart" size={24} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setactivetab("profile");
          }}
        >
          {userprofileimage ? (
            <Image
              style={
                activetab === "profile"
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
