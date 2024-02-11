import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/Header";
import Stories from "../components/Stories";
import Posts from "../components/Posts";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-ionicons";

export default function Home({ route }) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={"white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "mail" : "mail-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      {/* Add more screens as needed */}
    </Tab.Navigator>
  );
}

function FeedScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <StatusBar style="light" />
      <Header />
      <Stories />
      <Posts />
    </SafeAreaView>
  );
}

function MessagesScreen() {
  return (
    <View>
      <Text>Messages Screen</Text>
    </View>
  );
}
