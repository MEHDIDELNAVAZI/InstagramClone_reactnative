import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import stories from "../assets/data/users";

export default function Stories() {
  return (
    <ScrollView horizontal={true}>
      {stories.map((item, index) => (
        <View style={{}}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image
              key={index}
              source={{ uri: item.image }}
              style={styles.storyimage}
            />

            <Text style={styles.storytxt}>
              {item.user}
              {item.username}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icons: {
    marginRight: 15,
    color: "white",
  },
  logo: {
    width: 100,
    height: 20,
  },
  storyimage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 5,
    borderWidth: 1,
  },
  storytxt: {
    color: "black",
    fontSize: 15,
    color: "white",
    marginBottom: 50,
  },
});
