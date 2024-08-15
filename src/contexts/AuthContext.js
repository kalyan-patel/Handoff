import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'
import { updateProfile } from 'firebase/auth'


const AuthContext = React.createContext();


export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, name) {
    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      updateProfile(auth.currentUser, { 
        displayName: name 
      }).then(() => {
        console.log("Account created");
      }).catch((error) => {
        console.log(error);
      })
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
