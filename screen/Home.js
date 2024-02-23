import React, { useEffect, useState } from "react";
import { Text, SafeAreaView } from "react-native";
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
import { useProgress } from "../context/ProgressContext";
import ProgressBar from "../components/home/ProgressBar";
import Commentslider from "../components/Commentsection";

function Home({ navigation }) {
  const [useremail, setemailuser] = useState();
  const [showcommentsection, setshowcommentsection] = useState(false);
  const [selectedtab, setselectedtab] = useState("Home");
  const { progress, progressisactive } = useProgress();
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
          borderWidth: 2,
          borderColor: "black",
        }}
      >
        {selectedtab === "Home" && (
          <>
            <Header navigation={navigation} useremail={useremail} />
            <Stories />
            {progressisactive && <ProgressBar progress={progress} />}
            <Posts />
            <Commentslider
              showcommentsection={showcommentsection}
              setshowcommentsection={setshowcommentsection}
            />
          </>
        )}
        {selectedtab === "Userprofile" && <Userprofile />}
        {selectedtab === "Reels" && <Reels />}
        {selectedtab === "Explorer" && <Explor />}
        {selectedtab === "Profile" && <Userprofile />}
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
