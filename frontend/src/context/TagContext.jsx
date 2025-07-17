import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getAllTags } from "../services/api";

import { useUser } from "./UserContext";

const TagContext = createContext();

export default function TagProvider({ children }) {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllTags();
      setTags(data);
    } catch (error) {
      setError(error);
      console.error("Error loading tags", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const value = { tags, fetchTags, loading, error };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}

export function useTags() {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
}
