import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FacebookAuthProvider } from "firebase/auth";
import { onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { serverTimestamp, where } from "firebase/firestore";
import { collection, getDocs, query } from "firebase/firestore";

import { firebase_collection, router_link, TOAST_TYPE } from "../common ";
import { auth, db } from "../firebase/firebase-config";
import { generateKeywords, setDocById } from "../firebase/services";

const AuthContext = createContext();

const fbprovider = new FacebookAuthProvider();
const colRef = collection(db, firebase_collection.USERS);

function AuthProvider({ children, ...props }) {
  const [userInfo, setUserInfo] = useState({});

  const navigate = useNavigate();
  // console.log(userInfo);

  const handleSetUserInfo = (user) => {
    setUserInfo(user);
  };

  const handleSignInFacebook = async () => {
    try {
      const { providerId, user } = await signInWithPopup(auth, fbprovider);

      const { displayName, email, phoneNumber, photoURL, uid } = user;
      const timestamp = serverTimestamp();
      const docUser = {
        displayName,
        email,
        phoneNumber,
        photoURL,
        uid,
        timestamp,
        providerId,
        keywords: generateKeywords(displayName),
      };

      const queryUser = query(
        colRef,
        where("uid", "==", uid),
        where("email", "==", email)
      );
      // get list user
      const listUser = await getDocs(queryUser);

      if (listUser.empty) {
        setDocById(firebase_collection.USERS, uid, docUser);
      }

      toast.success("Login success", TOAST_TYPE);

      navigate(router_link.MESSAGES);
    } catch (error) {
      console.error(error.message);
      toast.error(error.message, TOAST_TYPE);
    }
  };

  // onAuthStateChanged
  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, (auth) => {
      if (!auth) {
        setUserInfo(auth);
        return;
      }
      const index = auth?.email.indexOf("@");
      const displayName = auth?.email.slice(0, index);

      const fullname = auth?.displayName;
      auth.displayName = fullname || displayName;
      setUserInfo(auth);
    });

    return () => unsubscibed();
  }, []);

  const value = { userInfo, handleSetUserInfo, handleSignInFacebook };
  return (
    <AuthContext.Provider value={value} {...props}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuthContext  must be used within AuthProvider");

  return context;
}

export { AuthProvider, useAuthContext };
