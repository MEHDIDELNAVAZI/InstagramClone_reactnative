import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  TouchableHighlightBase,
} from "react-native";
import { Formik } from "formik";
import { StatusBar } from "expo-status-bar";

function Login() {
  const styles = StyleSheet.create({
    loginview: {
      flex: 1,
      flexDirection: "column",
    },
    Loginlogo: {
      width: 100,
      height: 100,
      marginBottom: 20,
    },
    inputs: {
      width: 300,
      height: 40,
      fontSize: 20,
      borderWidth: 1,
      borderColor: "black",
      borderRadius: 2,
      marginBottom: 10,
      padding: 10,
      color: "black",
    },
    errors: {
      color: "red",
      marginTop: -5,
      marginBottom: 5,
    },
    submitbutton: {
      backgroundColor: "blue",
      width: 300,
      borderRadius: 3,
      height: 40,
      justifyContent: "center",
    },
    submittext: {
      color: "white",
      textAlign: "center",
    },
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#DFDFDF",
      }}
    >
      <StatusBar style="dark" />
      <Image
        source={require("../assets/login-logo.png")}
        style={styles.Loginlogo}
      />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          submitfunction();
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 6) {
            errors.password = "Password should be at least 6 characters long";
          }
          return errors;
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <TextInput
              style={styles.inputs}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              placeholder="Enter your email "
            />
            {errors.email ? (
              <Text style={styles.errors}>{errors.email}</Text>
            ) : null}
            <TextInput
              style={styles.inputs}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
            {errors.password ? (
              <Text style={styles.errors}>{errors.password}</Text>
            ) : null}

            <TouchableHighlight
              onPress={handleSubmit}
              style={styles.submitbutton}
            >
              <Text style={styles.submittext}>Submit</Text>
            </TouchableHighlight>
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
}

export default Login;
