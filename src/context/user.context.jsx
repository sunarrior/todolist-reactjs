import { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginState = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), []);

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
