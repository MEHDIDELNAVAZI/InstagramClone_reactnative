import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../components/addnewpost/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import { Divider } from "@rneui/themed";

export default function Addnewpost({ navigation }) {
  const imageplaceholder =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefVf1IYhNffMEpd7ho5ElzL-mW_U0XFboJQjvtAF_YQ&s";
  const [thumbnail, setthumbnail] = useState();
  const Addpostschema = Yup.object().shape({
    caption: Yup.string()
      .min(2, "Too Short caption !")
      .max(50, "Too Long caption !"),
    imageurl: Yup.string()
      .url("Image URL format is wrong")
      .required("Required"),
  });

  // const userPostsRef = collection(
  //   db,
  //   "users",
  //   userCredential.user.email,
  //   "posts"
  // );
  // // Add a post document to the "posts" collection
  // await addDoc(userPostsRef, {
  //   caption: "caption",
  //   imageUrl: "imageUrl",
  // });

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        <Header navigation={navigation} />

        <Formik
          initialValues={{
            caption: "",
            imageurl: "",
          }}
          validationSchema={Addpostschema}
          onSubmit={(values) => console.log(values)}
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
                  flexDirection: "row-reverse",
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                  }}
                >
                  <TextInput
                    onChangeText={handleChange("caption")}
                    onBlur={handleBlur("caption")}
                    value={values.caption}
                    placeholder="Enter caption"
                    placeholderTextColor={"gray"}
                    multiline={true}
                    style={[
                      styles.inputtext,
                      {
                        width: "100%",
                      },
                    ]}
                    numberOfLines={5}
                  />
                  {touched.caption && errors.caption && (
                    <Text style={[styles.error, { marginLeft: 10 }]}>
                      {errors.caption}
                    </Text>
                  )}
                </View>
                <Image
                  source={{
                    uri: values.imageurl ? values.imageurl : imageplaceholder,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
              <Divider width={1} style={{}} />

              <View
                style={{
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <TextInput
                  onChangeText={handleChange("imageurl")}
                  onBlur={handleBlur("imageurl")}
                  value={values.imageurl}
                  placeholder="Enter image url"
                  onChange={(e) => {
                    setthumbnail(e.target.value);
                  }}
                  style={[
                    styles.inputtext,
                    {
                      marginTop: 10,
                      borderWidth: 1,
                      borderColor: "gray",
                      height: 40,
                      borderRadius: 1,
                      padding: 5,
                    },
                  ]}
                  placeholderTextColor={"gray"}
                />
                {touched.imageurl && errors.imageurl && (
                  <Text style={[styles.error, { marginLeft: 10 }]}>
                    {errors.imageurl}
                  </Text>
                )}
              </View>
              <Button onPress={handleSubmit} title="Share" />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  inputtext: {
    color: "white",
    marginLeft: 10,
  },
  error: {
    color: "red",
    fontSize: 15,
  },
});
