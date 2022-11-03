import {
  FacebookAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { router_link, TOAST_TYPE } from "../common ";
import { auth } from "../firebase/firebase-config";

const AuthContext = createContext();

const fbprovider = new FacebookAuthProvider();

function AuthProvider({ children, ...props }) {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const handleSetUserInfo = (user) => {
    setUserInfo(user);
  };

  const handleSignInFacebook = async () => {
    try {
      await signInWithPopup(auth, fbprovider);
      toast.success("Login success", TOAST_TYPE);
      navigate(router_link.HOME);
    } catch (error) {
      toast.error(error.message, TOAST_TYPE);
    }
  };

  useEffect(() => {
    const unsubscibed = onAuthStateChanged(auth, (auth) => {
      setUserInfo(auth);
    });

    return () => unsubscibed();
  }, [navigate]);

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
