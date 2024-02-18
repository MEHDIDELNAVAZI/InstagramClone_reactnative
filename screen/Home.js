import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Header from "../components/home/Header";
import Stories from "../components/home/Stories";
import Bottontabs from "../components/home/Bottontabs";
import Posts from "../components/home/Posts";
import app from "../firebase";
import { getAuth } from "firebase/auth";
import Userprofile from "./Userprofile";
import Reels from "./Reels";
import Explor from "./Explor";

function Home({ navigation }) {
  const [useremail, setemailuser] = useState();
  const [selectedtab, setselectedtab] = useState("Home");
  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user !== null) {
      const emailUser = user.email;
      setemailuser(emailUser);
    }
  }, []);
  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "black",
        }}
      >
        {selectedtab === "Home" && (
          <>
            <Header navigation={navigation} useremail={useremail} />
            <Stories />
            <Posts />
          </>
        )}
        {selectedtab === "Userprofile" && (
          <>
            <Userprofile />
          </>
        )}
        {selectedtab === "Reels" && (
          <>
            <Reels />
          </>
        )}
        {selectedtab === "Explorer" && (
          <>
            <Explor />
          </>
        )}
        {selectedtab === "Profile" && (
          <>
            <Userprofile />
          </>
        )}
        <Bottontabs
          setselectedtab={setselectedtab}
          selectedtab={selectedtab}
          navigation={navigation}
          useremail={useremail}
        />
      </SafeAreaView>
    </>
  );
}
export default Home;
