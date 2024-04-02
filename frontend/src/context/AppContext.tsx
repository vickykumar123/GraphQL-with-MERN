import {createContext, useContext, useState} from "react";

interface User {
  email: string;
  token?: string | null;
  userId: string;
  loggedUser: (email: string, token: string, userId: string) => void;
}

const AppContext = createContext<User | null>(null);

export function AppContextProvider({children}: {children: React.ReactNode}) {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");

  function loggedUser(email: string, token: string, userId: string) {
    setEmail(email);
    setToken(token);
    setUserId(userId);
  }

  return (
    <AppContext.Provider
      value={{
        email,
        token,
        userId,
        loggedUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};
