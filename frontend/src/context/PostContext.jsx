import { createContext, useState, useEffect, useContext } from "react";
import { fetchPosts, fetchPostById } from "../services/api";

//TODO: fix context for posts

// Create a context
const PostContext = createContext();

// Create a provider
export const usePostContext = () => useContext(PostContext);

export default function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const getPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("Error loading posts", error);
    }
  };

  const getPostById = async (postId) => {
    try {
      const fetchedPost = await fetchPostById(postId);
      console.log("Fetched post:", fetchedPost);
      setSelectedPost(fetchedPost);
    } catch (error) {
      console.error("Error loading posts", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, selectedPost, getPosts, getPostById }}
    >
      {children}
    </PostContext.Provider>
  );
}
