import axios from "axios";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_API_BASE_URL;

//axios instance
const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
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

//new function to fetch post by id
export const getPostsById = async (postId) => {
  try {
    const { data } = await api.get(`/api/posts/${postId}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

export const addQuestion = async (question) => {
  try {
    const { data } = await api.post(
      `/api/posts`,
      { question: question },
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
    console.error("Error signing user up", error);
    throw error;
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
