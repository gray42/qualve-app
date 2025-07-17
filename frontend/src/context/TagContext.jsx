import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getAllTags, getTrendingTags } from "../services/api";

import { useUser } from "./UserContext";

const TagContext = createContext();

export default function TagProvider({ children }) {
  const [tags, setTags] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
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

  const fetchTrendingTags = useCallback(async () => {
    try {
      const tags = await getTrendingTags();
      setTrendingTags(tags);
    } catch (err) {
      console.error("Failed to fetch trending tags", err);
    }
  }, []);

  useEffect(() => {
    fetchTags();
    fetchTrendingTags();
  }, [fetchTags, fetchTrendingTags]);

  const value = {
    tags,
    fetchTags,
    loading,
    error,
    trendingTags,
    fetchTrendingTags,
  };

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
}

export function useTags() {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTags must be used within a TagProvider");
  }
  return context;
}
