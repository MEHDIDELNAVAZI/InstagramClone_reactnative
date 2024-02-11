import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React from "react";
import posts from "../assets/data/posts";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";

export default function Posts() {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",

          marginTop: 20,
        }}
      >
        {posts.map((item, index) => (
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 5,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  key={index}
                  source={{ uri: item.profile_img }}
                  style={styles.profileimage}
                />
                <Text style={styles.profilename}>{item.user}</Text>
              </View>
              <View>
                <Entypo name="dots-three-horizontal" size={24} color="white" />
              </View>
            </View>

            <Image
              key={index}
              source={{ uri: item.image }}
              style={styles.postimage}
            />

            <Text style={styles.storytxt}>{item.username}</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 4,
                }}
              >
                <AntDesign name="hearto" size={24} color="white" />
                <EvilIcons name="comment" size={30} color="white" />
                <Entypo name="share" size={24} color="white" />
              </View>

              <AntDesign name="save" size={24} color="white" />
            </View>
            <View>
              <Text style={styles.username}>{item.user}</Text>
              <Text style={styles.caption}>{item.caption}</Text>
            </View>
            <Text style={{ color: "white" }}>{item.likes}</Text>
            <Text
              style={{
                color: "gray",
              }}
            >
              {item.comments.length > 1 ? (
                <Text>View All {item.comments.length} Comments</Text>
              ) : (
                <Text>View 1 coment </Text>
              )}
            </Text>
            {item.comments.map((comment, cIndex) => (
              <View key={cIndex} style={styles.comment}>
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {comment.comment}
                </Text>
              </View>
            ))}
          </>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  postimage: {
    width: "100%",
    height: 500,
    marginRight: 5,
  },
  storyimage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 5,
    borderWidth: 1,
    borderColor: "red",
  },
  storytxt: {
    fontSize: 15,
    color: "white",
  },
  profilename: {
    fontSize: 13,
    color: "white",
  },
  profileimage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
  },
  caption: {
    color: "white",
  },
  username: {
    fontWeight: 400,
    color: "white",
  },
});
