import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

function Header({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Ionicons name="chevron-back" size={30} color="white" />
      </TouchableOpacity>
      <Text
        style={{
          color: "white",
          fontWeight: "bold",
        }}
      >
        ADDPOST
      </Text>
      <Text></Text>
    </SafeAreaView>
  );
}
export default Header;
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignItems: "center",
    marginTop: 20,
  },
});
