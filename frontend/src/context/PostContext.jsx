import { createContext, useState, useEffect, useContext } from "react";
import {
  getPosts,
  getPostsById,
  addAnswer,
  addQuestion,
} from "../services/api";

//TODO: fix context for posts - look into book for reference

// Create a context
const PostContext = createContext();

// eslint-disable-next-line react/prop-types
export default function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      setError(error);
      console.error("Error loading posts", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPostById = async (postId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPostsById(postId);
      setSelectedPost(data);
    } catch (error) {
      setError(error);
      console.error("Error loading posts", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addAnswerToPost = async (postId, answer) => {
    try {
      const updatedPost = await addAnswer(postId, answer);
      setSelectedPost((prevPost) =>
        prevPost && prevPost.id === postId ? updatedPost : prevPost,
      );
    } catch (error) {
      setError(error);
      console.error("Error adding answer to post", error);
    }
  };

  const addQuestionToPage = async (question) => {
    try {
      const newPost = await addQuestion(question);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      setError(error);
      console.error("Error adding answer to post", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    addAnswerToPost,
    addQuestionToPage,
    selectedPost,
  };

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

export function usePosts() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
}
