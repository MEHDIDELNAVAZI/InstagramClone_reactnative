import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Posts from "../userprofile/Posts";
import Video from "../userprofile/Video";
import Contact from "../userprofile/Contact";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Dimensions, Button, Animated } from "react-native";

function Userprofileimage() {
  const Tab = createMaterialTopTabNavigator();
  const user = auth.currentUser;
  const [userdata, setuserdata] = useState(null);
  async function getUserData() {
    try {
      const userref = doc(db, "users", user.email);
      const docSnap = await getDoc(userref);
      if (docSnap.exists) {
        setuserdata(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("jahsdbcjahsdbchjasbdcjhasbdjhcbasjhdc");
    }
  }
  useEffect(() => {}, []);

  const popupanim = useRef(new Animated.Value(0)).current;
  const popup = () => {
    // Will change popupanim value to 1 in 5 seconds
    Animated.timing(popupanim, {
      toValue: 1, // change from 0 to 1
      duration: 400,
      useNativeDriver: true,
    }).start();
  };
  const popout = () => {
    // Will change popupanim value to 1 in 5 seconds
    Animated.timing(popupanim, {
      toValue: 0, // change from 0 to 1
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
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
              height: 35,
              alignContent: "center",
              borderRadius: 5,
              backgroundColor: "#698689",
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
              onPress={popup}
            >
              Edit profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 35,
              alignItems: "center",
              borderRadius: 5,
              backgroundColor: "#698689",
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
              height: 35,
              alignContent: "center",
              borderRadius: 5,
              backgroundColor: "#698689",
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
            height: "100%",
          }}
        >
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarStyle: { backgroundColor: "black", marginTop: 20 },
              tabBarIndicatorStyle: {
                backgroundColor: "white",
              },
              tabBarShowIcon: true,
              tabBarShowLabel: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Posts") {
                  iconName = focused ? "newspaper" : "newspaper-outline"; // Example icon for the "Posts" tab
                } else if (route.name === "Video") {
                  iconName = focused ? "videocam" : "videocam-outline"; // Example icon for the "Video" tab
                } else if (route.name === "Contact") {
                  iconName = focused ? "person" : "person-outline"; // Example icon for the "Contact" tab
                }
                // Return an Ionicons component with the appropriate icon name, color, and size
                return <Ionicons name={iconName} size={25} color={"white"} />;
              },
              lazy: true,
            })}
          >
            <Tab.Screen name={"Posts"} component={Posts} />
            <Tab.Screen name="Video" component={Video} />
            <Tab.Screen name="Contact" component={Contact} />
          </Tab.Navigator>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button title="popup view" onPress={popup} />
      </View>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            // Bind opacity to animated value
            transform: [
              {
                translateY: popupanim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get("window").height, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity onPress={popout}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.fadingText}>Edit Profile</Text>
          <Text></Text>
        </View>
      </Animated.View>
    </>
  );
}
export default Userprofileimage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fadingContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: Dimensions.get("window").height, // Adjust the height as needed
    backgroundColor: "black",
  },
  fadingText: {
    fontSize: 18,
    color: "white",
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
