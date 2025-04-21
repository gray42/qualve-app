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

  useEffect(() => {
    fetchPosts();
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
      const data = await voteOnPost(postId, voteType, answerId);

      if (selectedPost && selectedPost._id === postId) {
        setSelectedPost(data);
      } else {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post._id === postId ? data : post)),
        );
      }
    } catch (error) {
      console.error("Error voting", error);
    }
  };

  const value = {
    posts,
    loading,
    error,
    fetchPosts,
    fetchPostById,
    addAnswerToPost,
    addQuestionToPage,
    handleVote,
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
