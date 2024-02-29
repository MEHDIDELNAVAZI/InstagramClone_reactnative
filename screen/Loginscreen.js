import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-gesture-handler";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Loginscreen({ navigation }) {
  const Loginschema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const [loading, setLoading] = useState(false);

  const Onlogin = async (email, password) => {
    setLoading(true); // Set loading to true when login process starts
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false); // Set loading to false when login process completes
        navigation.push("Homescreen");
      })
      .catch((error) => {
        setLoading(false); // Set loading to false if there's an error in the login process
        // Handle errors
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign in error:", errorCode, errorMessage);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          alignItems: "center",
          gap: 5,
          flex: 1,
          marginTop: 40,
        }}
      >
        <Image
          source={require("../assets/login-logo.png")}
          style={styles.logoimage}
        />

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={Loginschema}
          onSubmit={(values) => {
            Onlogin(values.email, values.password);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                onChangeText={handleChange("email")}
                value={values.email}
                onBlur={handleBlur("email")}
                style={[
                  styles.inputetx,

                  touched.email && errors.email
                    ? {
                        borderWidth: 1,
                        borderColor: "red",
                      }
                    : {},
                ]}
                placeholder="Enter your email or username"
                placeholderTextColor={"black"}
              />
              {touched.email && errors.email ? (
                <Text style={styles.error}>{errors.email}</Text>
              ) : null}

              <TextInput
                onChangeText={handleChange("password")}
                value={values.password}
                onBlur={handleBlur("password")}
                style={[
                  styles.inputetx,
                  touched.password && errors.password
                    ? {
                        borderWidth: 1,
                        borderColor: "red",
                      }
                    : {},
                ]}
                placeholder="Enter your password"
                placeholderTextColor={"black"}
                secureTextEntry // If it's a password field
              />
              {touched.password && errors.password ? (
                <Text style={styles.error}>{errors.password}</Text>
              ) : null}

              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.loginbutton}
                disabled={loading} // Disable button when loading is true
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 15,
                    }}
                  >
                    Login
                  </Text>
                )}
              </TouchableOpacity>
              <View style={styles.signupContainer}>
                <Text>Don't have an account?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.push("Signup");
                  }}
                >
                  <Text style={styles.signupText}>Signup</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  logoimage: {
    width: 100,
    height: 100,
  },
  inputetx: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginTop: 5,
    padding: 10,
    backgroundColor: "#EEF5FF",
  },
  error: {
    color: "red",
    fontSize: 15,
    textAlign: "right",
  },
  loginbutton: {
    width: 300,
    backgroundColor: "blue",
    height: 40,
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  signupContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  signupText: {
    color: "blue",
    marginLeft: 5,
  },
});
