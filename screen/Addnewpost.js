import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import Header from "../components/addnewpost/Header";
import { Formik } from "formik";
import * as Yup from "yup";
import { Divider } from "@rneui/themed";
import app, { storage } from "../firebase";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { useProgress } from "../context/ProgressContext";

export default function Addnewpost({ navigation, route }) {
  const { useremail } = route.params;
  const [image, setImage] = useState(null);
  const { updateProgress } = useProgress();
  const { updateProgressisactive } = useProgress();

  async function uplouddata(uri, typeoffile) {
    if (typeoffile === "image") {
      updateProgressisactive(true);
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, "/images" + new Date().getTime());
      /// uniq name for the image name
      const uploudeprocess = uploadBytesResumable(storageRef, blob);
      return new Promise((resolve, reject) => {
        uploudeprocess.on(
          "state_changed",
          (snapshot) => {
            const progressPercentage = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            updateProgress(progressPercentage);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            console.log("uploading completed ");
            updateProgressisactive(false);
            try {
              const downloadURL = await getDownloadURL(
                uploudeprocess.snapshot.ref
              );
              console.log("Download URL:", downloadURL);
              resolve(downloadURL);
            } catch (error) {
              console.log("Error getting download URL:", error);
              reject(error);
            }
          }
        );
      });
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
      quality: 0.2,
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
    await addDoc(userPostsRef, {
      caption: values.caption,
      imageUrl: imageurl,
    });
  }

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
          }}
          validationSchema={Addpostschema}
          onSubmit={(values) => {
            if (image) {
              addnewpost(useremail, values);
              navigation.goBack();
            } else {
            }
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
              <Divider width={2} style={{}} />
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={{
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "blue",
                    height: 40,
                    borderRadius: 5,
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Share
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
        <View
          style={{
            position: "absolute",
            bottom: 100,
            right: 10,
            padding: 4,
            flexDirection: "column",
            gap: 20,
          }}
        >
          <TouchableOpacity onPress={pickImage}>
            <AntDesign name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="video-camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
