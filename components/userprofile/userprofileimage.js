import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Header from "../userprofile/Header";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

function Userprofileimage() {
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
      <View style={styles.mainContainer}>
        <View style={styles.childView}>
          <Text
            style={{
              color: "white",
            }}
          >
            shbhdcsd
          </Text>
        </View>
        <View style={styles.childView}>
          <Text
            style={{
              color: "white",
            }}
          >
            shbhdcsd
          </Text>
        </View>
        <View style={styles.childView}>
          <Text
            style={{
              color: "white",
            }}
          >
            shbhdcsd
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1, // Ensures main container takes up the available space
        }}
      >
        <TouchableOpacity
          style={{
            padding: 10,
            alignContent: "center",
            borderRadius: 5,
            backgroundColor: "gray",
            flex: 1,
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
            padding: 10,
            alignContent: "center",
            borderRadius: 5,
            backgroundColor: "gray",
            flex: 1,
          }}
        >
          <Text
            style={{
              color: "white",
            }}
          >
            Share profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            padding: 10,
          }}
        >
          <AntDesign name="adduser" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
}
export default Userprofileimage;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "stretch", // Ensures child views stretch to fill the entire width
    justifyContent: "space-between", // Adjust as per your layout requirements
    flex: 1, // Ensures main container takes up the available space
  },
  childView: {
    flex: 1, // Each child view takes up equal space
    backgroundColor: "lightgray", // Just for visualization
    margin: 5, // Optional: Add margin between child views
  },
});
