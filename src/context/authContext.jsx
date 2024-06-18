import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import React from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth } from "../app/firebase";
import { db } from "../app/firebase";

export const authContext = createContext();



// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });
// querySnapshot.forEach((doc) => {
//   const id = doc.id
//   onValue(id, (snapshot) => {
//     const data = snapshot.val();
//     updateStarCount(postElement, data);
//   })
//   // console.log(doc.id
//   console.log(sna)
// })


export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // try {
  //   const docRef = await addDoc(collection(db, "users"), {
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1815
  //   });
  //   console.log("Document written with ID: ", docRef.id);
  // } catch (e) {
  //   console.error("Error adding document: ", e);
  // }
  

  const singup = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);

  };
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const haldleLogout = async () => {
    await logout();
  };

  const logout = () => signOut(auth);

  const loginWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        singup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        haldleLogout,
      }}
    >
      {children}
    </authContext.Provider>
  );
}
