import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screen/Home";
import Addnewpost from "./screen/Addnewpost";
import Loginscreen from "./screen/Loginscreen";
import Signup from "./screen/Signup";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "./firebase";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Explor from "./screen/Explor";
import Reels from "./screen/Reels";
import Userprofile from "./screen/Userprofile";

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
  const Tab = createBottomTabNavigator();

  // Render different screens based on authentication state
  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator
          screenOptions={{
            headerShown: false, // Hide the header for all screens
            tabBarStyle: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Explor" component={Explor} />
          <Tab.Screen name="Addnewpost" component={Addnewpost} />
          <Tab.Screen name="Reels" component={Reels} />
          <Tab.Screen name="Profile" component={Userprofile} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="Loginscreen" component={Loginscreen} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
