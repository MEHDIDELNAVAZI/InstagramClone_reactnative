import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screen/Home";
import Addnewpost from "./screen/Addnewpost";
import Loginscreen from "./screen/Loginscreen";
import Signup from "./screen/Signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";

export default function Authuser() {
  const Stack = createStackNavigator();
  const screenOptions = {
    headerShown: false,
  };
  const [user, setUser] = useState(null); // State to keep track of the authenticated user
  useEffect(() => {
    const auth = getAuth(app);
    // Listen for authentication state changes
    onAuthStateChanged(auth, (user) => {
      setUser(user); // Update the user state
    });
  }, []);
  // Render different screens based on authentication state
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions}>
        {user ? (
          <>
            <Stack.Screen name="Homescreen" component={Home} />
            <Stack.Screen name="Addnewpost" component={Addnewpost} />
          </>
        ) : (
          <>
            <Stack.Screen name="Loginscreen" component={Loginscreen} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
