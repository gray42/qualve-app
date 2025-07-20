import { createContext, useState, useEffect, useContext } from "react";
import {
  logUserIn,
  getUser,
  signUserUp,
  logUserOut,
  getAllUsersAPI,
} from "../services/api";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        setUser(user);
      } catch (error) {
        if (error.response?.status === 401) {
          // Not logged in — expected on public pages
          setUser(null);
        } else {
          console.error("Unexpected error fetching user:", error);
        }
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchUser();
  }, []);

  const updateReputation = (newRep) => {
    setUser((prevUser) => ({ ...prevUser, reputation: newRep }));
  };

  const login = async (credentials) => {
    try {
      await logUserIn(credentials, {
        withCredentials: true,
      });

      // Fetch fresh user data after successful login
      const user = await getUser();
      setUser(user);

      navigate("/");
      return user;
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
      navigate("/login");
      return data;
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logUserOut({
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  };

  const getAllUsers = async () => {
    try {
      const { users } = await getAllUsersAPI();
      setUsers(users);
    } catch (error) {
      console.error("Error getting all users", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    setUser,
    login,
    register,
    logout,
    updateReputation,
    getAllUsers,
    users,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
