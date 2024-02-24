import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import posts from "../../assets/data/posts";
import Postheader from "./Postheader";
import Postfooter from "./Postfotter";

function Posts() {
  const renderdata = (item) => {
    return (
      <>
        <View>
          <Postheader imageUri={item.profile_img} username={item.user} />
          <Image source={{ uri: item.image }} style={styles.postimage} />
          <Postfooter item={item} />
        </View>
      </>
    );
  };
  return <FlatList data={posts} renderItem={({ item }) => renderdata(item)} />;
}

const styles = StyleSheet.create({
  postimage: {
    width: "100%",
    height: 300,
    marginRight: 5,
  },
});

export default Posts;
