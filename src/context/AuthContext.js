import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 Monitor user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // 🔐 Login
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // 🆕 Signup (with name support)
  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Set display name for the new user
    await updateProfile(userCredential.user, { displayName: name });
    setUser({ ...userCredential.user, displayName: name });
    return userCredential.user;
  };

  // 🚪 Logout
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
