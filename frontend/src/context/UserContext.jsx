import { createContext, useState, useEffect, useContext } from "react";
import { logUserIn, getUser, signUserUp, logUserOut } from "../services/api";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
      }
    };
    fetchUser();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await logUserIn(credentials, {
        withCredentials: true,
      });
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const register = async (credentials) => {
    try {
      const { data } = await signUserUp(credentials, {
        withCredentials: true,
      });
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { data } = await logUserOut({
        withCredentials: true,
      });
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return user;
}
