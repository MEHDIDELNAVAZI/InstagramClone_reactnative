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
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Divider } from "@rneui/themed";
import app, { storage } from "../firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "@firebase/storage";

export default function Addnewpost({ navigation, route }) {
  const { useremail } = route.params;
  const [image, setImage] = useState(null);

  async function uplouddata(uri, typeoffile) {
    if (typeoffile === "image") {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, "/images" + new Date().getTime());
      /// uniq name for the image name
      const uploudeprocess = uploadBytesResumable(storageRef, blob);
      uploudeprocess.on(
        "state_changed",
        (snapshout) => {
          const proggresspersentage = Math.round(
            (snapshout.bytesTransferred / snapshout.totalBytes) * 100
          );
          console.log(proggresspersentage);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log("uploding completed ");
          getDownloadURL(uploudeprocess.snapshot.ref).then(
            async (downlodeurl) => {
              return downlodeurl;
            }
          );
        }
      );
    } else {
      //  handle video uplouding to fire base
    }
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const response = result.assets[0].uri;
      setImage(response);
    }
  };

  const imageplaceholder =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQefVf1IYhNffMEpd7ho5ElzL-mW_U0XFboJQjvtAF_YQ&s";
  const [thumbnail, setthumbnail] = useState();
  const Addpostschema = Yup.object().shape({
    caption: Yup.string()
      .min(2, "Too Short caption !")
      .max(50, "Too Long caption !"),
  });
  const db = getFirestore(app);

  async function addnewpost(useremail, values) {
    const imageurl = await uplouddata(image, "image");
    const userPostsRef = collection(db, "users", useremail, "posts");
    // Add a post document to the "posts" collection
    await addDoc(userPostsRef, {
      caption: values.caption,
      imageUrl: imageurl,
    });
  }

  return (
    <>
      <StatusBar style="light" />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
      </View>
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
          }}
          validationSchema={Addpostschema}
          onSubmit={(values) => {
            addnewpost(useremail, values);
            navigation.goBack();
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
                    uri: image ? image : imageplaceholder,
                  }}
                  style={{
                    width: 100,
                    height: 100,
                  }}
                />
              </View>
              <Divider width={1} style={{}} />

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
