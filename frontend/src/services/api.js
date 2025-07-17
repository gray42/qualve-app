import axios from "axios";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_API_BASE_URL;

//axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//backend calls
export const getPosts = async () => {
  try {
    const { data } = await api.get("/api/posts");
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

export const getPostsByTag = async (tag) => {
  try {
    const { data } = await api.get(`/api/posts/tags/${tag}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching posts by tag", error);
    throw error;
  }
};

export const getHotPosts = async () => {
  try {
    const { data } = await api.get("/api/posts/hot", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

//new function to fetch post by id
export const getPostsById = async (postId) => {
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

export const getPostsByUserId = async (userId) => {
  try {
    const { data } = await api.get(`/api/posts/user/${userId}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}`, error);
    throw error;
  }
};

export const addQuestion = async (title, body, selectedTags) => {
  try {
    const { data } = await api.post(
      `/api/posts`,
      { title: title, body: body, tags: selectedTags },
      {
        withCredentials: true,
      },
    );

    return data;
  } catch (error) {
    console.error("Error occurred adding question", error);
    throw error;
  }
};

export const getTagSuggestions = async (query) => {
  try {
    const { data } = await api.get(`/api/tags/search?query=${query}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error occurred adding question", error);
    throw error;
  }
};

export const getTrendingTags = async () => {
  try {
    const { data } = await api.get("/api/posts/trending-tags", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

export const getAllTags = async () => {
  try {
    const { data } = await api.get("/api/tags/", {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

export const addAnswer = async (postId, answer) => {
  try {
    const { data } = await api.post(
      `/api/posts/${postId}/answers`,
      { answer: answer },
      {
        withCredentials: true,
      },
    );
    return data;
  } catch (error) {
    console.error("Error occurred adding answer", error);
    throw error;
  }
};

export const voteOnPost = async (postId, voteType, answerId = null) => {
  try {
    const { data } = await api.post(
      `/api/posts/${postId}/vote`,
      { voteType, answerId },
      {
        withCredentials: true,
      },
    );
    return data;
  } catch (error) {
    console.error("Error occurred updating vote", error);
    throw error;
  }
};

export const isAnswered = async (postId) => {
  try {
    const { data } = await api.patch(`/api/posts/${postId}/answered`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error occurred updating vote", error);
    throw error;
  }
};

export const approveAnswerAPI = async (postId, answerId) => {
  try {
    const { data } = await api.patch(
      `/api/posts/${postId}/answers/${answerId}/approve`,
      {
        withCredentials: true,
      },
    );
    return data;
  } catch (error) {
    console.error("Error occurred updating answer status", error);
    throw error;
  }
};

//user calls

export const getUser = async () => {
  try {
    const { data } = await api.get("/api/auth/user", { withCredentials: true });
    return data;
  } catch (error) {
    console.error("User not authenticated", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const { data } = await api.get(`/api/auth/users/${userId}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}`, error);
    throw error;
  }
};

export const logUserIn = async (credentials) => {
  try {
    const { data } = await api.post("/api/auth/login", credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error logging in user", error);
    throw error;
  }
};

export const signUserUp = async (credentials) => {
  try {
    const { data } = await api.post("/api/auth/register", credentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Registration failed. Try again.";
    throw new Error(message);
  }
};

export const logUserOut = async () => {
  try {
    const { data } = await api.post(
      "/api/auth/logout",
      {},
      {
        withCredentials: true,
      },
    );
    return data;
  } catch (error) {
    console.error("Could not log user out", error);
    throw error;
  }
};

export const updateUserById = async (userId, updatedData) => {
  try {
    const { data } = await api.put(`/api/auth/${userId}`, updatedData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error signing user up", error);
    throw error;
  }
};
