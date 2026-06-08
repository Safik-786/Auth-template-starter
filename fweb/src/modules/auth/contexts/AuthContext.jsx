import { createContext, useContext, useState, useEffect } from "react";
import authClient from "../lib/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await authClient.get("/auth/me");
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };
    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isInitializing,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthMeta = () => {
  return useContext(AuthContext);
};
