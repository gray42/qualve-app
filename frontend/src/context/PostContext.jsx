import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  getPosts,
  getPostsById,
  addAnswer,
  addQuestion,
  voteOnPost,
  getTrendingTags,
  getHotPosts as fetchHotPosts,
  getPostsByUserId,
  getPostsByTag,
  isAnswered,
  approveAnswerAPI,
} from "../services/api";

import { useUser } from "./UserContext";

// Create a context
const PostContext = createContext();

// eslint-disable-next-line react/prop-types
export default function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [hotPosts, setHotPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  const { updateReputation } = useUser();

  useEffect(() => {
    fetchPosts();
    fetchTrendingTags();
    loadHotPosts();
  }, []);

  const fetchPosts = useCallback(async () => {
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
  }, []);

  const fetchPostsByUserId = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPostsByUserId(userId);
      setUserPosts(data);
    } catch (error) {
      setError(error);
      console.error(`Error loading posts for user ${userId}`, error);
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

  const fetchPostsByTag = useCallback(async (tag) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPostsByTag(tag);
      setPosts(data);
    } catch (error) {
      setError(error);
      console.error(`Error loading posts for tag ${tag}`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const approveAnswer = useCallback(
    async (postId, answerId) => {
      try {
        setLoading(true);
        setError(null);
        const data = await approveAnswerAPI(postId, answerId);
        // Optionally update the selectedPost state immediately
        if (selectedPost && selectedPost._id === postId) {
          setSelectedPost(data.post);
        }
        return data;
      } catch (error) {
        setError(error);
        console.error("Error approving answer", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [selectedPost],
  );

  const loadHotPosts = async () => {
    try {
      const posts = await fetchHotPosts();
      setHotPosts(posts);
    } catch (err) {
      console.error("Failed to load hot posts", err);
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

  const addQuestionToPage = async (question, selectedTags) => {
    try {
      const newPost = await addQuestion(question, selectedTags);
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    } catch (error) {
      setError(error);
      console.error("Error adding answer to post", error);
    }
  };

  //manage votes
  const handleVote = async (postId, voteType, answerId = null) => {
    try {
      const { post: updatedPost, updatedReputation } = await voteOnPost(
        postId,
        voteType,
        answerId,
      );

      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(updatedPost);
      } else {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? updatedPost : post)),
        );
      }

      updateReputation(updatedReputation);
    } catch (error) {
      console.error("Error voting", error);
    }
  };

  const answered = async (postId) => {
    try {
      const data = await isAnswered(postId);

      // Always update the posts array
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? data.post : post)),
      );

      // Also update selectedPost if it matches
      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(data.post);
      }

      return data.post;
    } catch (error) {
      console.error("Error voting", error);
      throw error;
    }
  };

  const value = {
    posts,
    trendingTags,
    hotPosts,
    loadHotPosts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    fetchTrendingTags,
    addAnswerToPost,
    addQuestionToPage,
    handleVote,
    selectedPost,
    userPosts,
    fetchPostsByUserId,
    fetchPostsByTag,
    answered,
    approveAnswer,
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
