import { createContext, useContext, useState, useEffect, useMemo } from "react";

import { auth } from "../config/firebase.config";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const userContext = useMemo(
    () => ({
      isAuthenticating,
      isLoggedIn,
      userData,
      setIsLoggedIn,
      setUserData,
    }),
    [isLoggedIn, userData]
  );

  useEffect(() => {
    const uobj = JSON.parse(localStorage.getItem("_uobj"));
    if (!uobj) {
      setIsLoggedIn(false);
      setUserData(null);
      return setIsAuthenticating(false);
    }
    const unsubscribe = auth.onAuthStateChanged((userFirebase) => {
      if (
        userFirebase?.accessToken?.localeCompare(uobj?.access_token) === 0 &&
        userFirebase?.refreshToken?.localeCompare(uobj?.refresh_token) === 0 &&
        userFirebase?.stsTokenManager?.expirationTime ===
          uobj?.expiration_time &&
        userFirebase?.email?.localeCompare(uobj?.email) === 0
      ) {
        const timeLeft = uobj.expiration_time - new Date();
        if (timeLeft > 0) {
          setIsLoggedIn(true);
        }
      }
      setUserData({ ...userData, email: uobj.email });
      setIsAuthenticating(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // useEffect(() => {
  //   const uobj = JSON.parse(localStorage.getItem("_uobj"));
  //   if (uobj) {
  //     const timeLeft = uobj.expiration_time - new Date();
  //     if (timeLeft > 0) {
  //       setIsLoggedIn(true);
  //       setUserData({ ...userData, email: uobj.email });
  //     }
  //   }
  // }, []);

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

export { UserProvider, useUser };
