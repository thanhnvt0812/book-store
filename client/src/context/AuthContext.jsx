/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
const googleProvider = new GoogleAuthProvider();
//authProvider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminAuth, setAdminAuth] = useState(null);
  //register
  const registerUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  //login
  const loginUser = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  //sign up with GG
  const signInWithGoogle = async () => {
    return await signInWithPopup(auth, googleProvider);
  };
  //logout
  const logout = () => {
    return signOut(auth);
  };
  //manage user state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        // User is signed in
        const { email, displayName, photoURL } = user;
        const userData = {
          email,
          username: displayName,
          avatar: photoURL,
        };
        return () => unsub();
      } else {
        // User is signed out
        // ...
      }
    });
  }, []);
  const value = {
    user,
    registerUser,
    loginUser,
    signInWithGoogle,
    logout,
    loading,
    setAdminAuth,
    adminAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
