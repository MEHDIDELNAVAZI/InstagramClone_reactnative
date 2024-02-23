import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React from "react";
import stories from "../../assets/data/users";
import { Divider } from "@rneui/themed";

export default function Stories() {
  const renderdata = (item) => {
    return (
      <>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image source={{ uri: item.image }} style={styles.storyimage} />
          <Text style={styles.storytxt}>
            {item.user}
            {item.username}
          </Text>
        </View>
      </>
    );
  };
  return (
    <>
      <FlatList
        horizontal={true}
        data={stories}
        renderItem={({ item }) => renderdata(item)} // Pass each item to the renderdata function
      />
      <Divider width={1} color="gray" />
    </>
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
    width: 70,
    height: 70,
    borderRadius: 40,
    marginRight: 5,
    borderWidth: 1,
    borderWidth: 3,
    borderColor: "#F57D1F",
  },
  storytxt: {
    color: "black",
    fontSize: 13,
    color: "white",
    height: 70,
    marginTop: 4,
  },
});
