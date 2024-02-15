import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home  from "./screen/Home";
import Addnewpost from "./screen/Addnewpost";

const Navigations = () => {
  const Stack = createStackNavigator();
  const screenoptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenoptions}>
        <Stack.Screen name="Homescreen" component={Home} />
        <Stack.Screen name="Addnewpost" component={Addnewpost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;

const styles = StyleSheet.create({});
