import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Assuming you're using Expo and Ionicons

import Home from "./screen/Home";
import Addnewpost from "./screen/Addnewpost";
import Loginscreen from "./screen/Loginscreen";
import Signup from "./screen/Signup";
import Explor from "./screen/Explor";
import Reels from "./screen/Reels";
import Userprofile from "./screen/Userprofile";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

export default function Authuser() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  const Tab = createBottomTabNavigator();

  const tabBarOptions = {
    activeTintColor: "white",
    inactiveTintColor: "white",
  };

  const screenOptions = ({ route }) => ({
    tabBarStyle: {
      backgroundColor: "black",
    },
    tabBarIcon: ({ color, size, focused }) => {
      let iconName;
      if (route.name === "Home") {
        iconName = focused ? "home" : "home-outline";
      } else if (route.name === "Explor") {
        iconName = focused ? "search" : "search-outline";
      } else if (route.name === "Addnewpost") {
        iconName = focused ? "add-circle" : "add-circle-outline";
      } else if (route.name === "Reels") {
        iconName = focused ? "videocam" : "videocam-outline";
      } else if (route.name === "Profile") {
        iconName = focused ? "person" : "person-outline";
      }
      // You can return any component here, like custom icons or other libraries
      return <Ionicons name={iconName} size={size} color={"white"} />;
    },
    headerShown: false,
  });

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          tabBarOptions={tabBarOptions}
          screenOptions={screenOptions}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Explor" component={Explor} />
          <Tab.Screen name="Addnewpost" component={Addnewpost} />
          <Tab.Screen name="Reels" component={Reels} />
          <Tab.Screen name="Profile" component={Userprofile} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Loginscreen" component={Loginscreen} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
