import { StyleSheet, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import React from "react";

function Postfooter({ item }) {
  return (
    <View style={styles.container}>
      <View>
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
            <EvilIcons name="heart" size={30} color="white" />
            <EvilIcons name="comment" size={30} color="white" />
            <EvilIcons name="share-apple" size={30} color="white" />
          </View>
          <Feather name="bookmark" size={24} color="white" />
        </View>

        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text style={{ color: "gray" }}>{item.likes}</Text>
          <Text style={{ color: "gray" }}>likes</Text>
        </View>
        <View>
          <Text>
            <Text style={styles.username}>{item.user}</Text>
            <Text> </Text>
            <Text style={styles.caption}>{item.caption}</Text>
          </Text>
        </View>

        <Text
          style={{
            color: "gray",
          }}
        >
          {item.comments.length != 0 ? (
            item.comments.length > 1 ? (
              <Text>View All {item.comments.length} Comments</Text>
            ) : (
              <Text>View 1 coment </Text>
            )
          ) : null}
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {
    color: "white",
  },
  username: {
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1, // This makes the container take up all available space
    padding: 10, // Example padding
    // Add any other styles you want for your container
  },
});

export default Postfooter;
