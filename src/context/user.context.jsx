import { createContext, useContext, useState, useEffect, useMemo } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }),
    [isLoggedIn]
  );

  useEffect(() => {
    const uobj = JSON.parse(localStorage.getItem("_uobj"));
    if (uobj) {
      const timeLeft = uobj.expiration_time - new Date();
      if (timeLeft > 0) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={loginState}>{children}</UserContext.Provider>
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
