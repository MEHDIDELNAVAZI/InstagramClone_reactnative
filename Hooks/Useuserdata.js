import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Import necessary Firebase functions
import { doc, getDoc } from "firebase/firestore";

const useFetchUser = () => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User not logged in");
        }
        const userRef = doc(db, "users", user.email);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such user!");
        }
      } catch (error) {
        return false;
      }
    };
    fetchUserData();
  }, []);
  return { userData };
};

export default useFetchUser;
