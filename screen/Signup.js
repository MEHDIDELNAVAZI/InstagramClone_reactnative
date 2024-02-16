import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextInput } from "react-native-gesture-handler";
import app from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { doc, setDoc, addDoc ,collection } from "firebase/firestore";

function Signup({ navigation }) {
  const Signupschema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Must be 8 characters or more")
      .matches(/[a-z]+/, "One lowercase character")
      .matches(/[A-Z]+/, "One uppercase character")
      .matches(/[@$!%*#?&]+/, "One special character")
      .matches(/\d+/, "One number"),
  });
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const getrandomeimageprofile = async () => {
    const res = await fetch("https://randomuser.me/api");
    const data = res.json();
    return data.result[0].picture.range;
  };
  const onSignup = async (email, password, username) => {
    setLoading(true); // Set loading to true when signup process starts
    try {
      // Step 1: Sign up the user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Step 2: Add user details to Firestore
      await setDoc(doc(db, "users", userCredential.user.email), {
        owner_id: userCredential.user.uid,
        usernmae: username,
        email: userCredential.user.email,
      });
      const userPostsRef = collection(
        db,
        "users",
        userCredential.user.email,
        "posts"
      );
      // Add a post document to the "posts" collection
      await addDoc(userPostsRef, {
        caption: "caption",
        imageUrl: "imageUrl",
      });

      setLoading(false);
    } catch (error) {
      console.log("Error occurred when creating user: ", error);
    }
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
            username: "",
            password: "",
          }}
          validationSchema={Signupschema}
          onSubmit={(values) => {
            onSignup(values.email, values.password, values.username);
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
              <View
                style={{
                  flexDirection: "column",
                }}
              >
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
                  placeholder="Enter your email address"
                  placeholderTextColor={"black"}
                />
                {touched.email && errors.email ? (
                  <Text style={styles.error}>{errors.email}</Text>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: "column",
                }}
              >
                <TextInput
                  onChangeText={handleChange("username")}
                  value={values.username}
                  onBlur={handleBlur("username")}
                  style={[
                    styles.inputetx,

                    touched.username && errors.username
                      ? {
                          borderWidth: 1,
                          borderColor: "red",
                        }
                      : {},
                  ]}
                  placeholder="Enter a username"
                  placeholderTextColor={"black"}
                />
                {touched.username && errors.username ? (
                  <Text style={styles.error}>{errors.username}</Text>
                ) : null}
              </View>

              <View
                style={{
                  flexDirection: "column",
                }}
              >
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
              </View>

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
                    Signup
                  </Text>
                )}
              </TouchableOpacity>
              <View style={styles.signupContainer}>
                <Text>Already have an acount ?</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.signupText}>Login</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}
export default Signup;

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
    fontSize: 12,
    flexDirection: "row-reverse",
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
