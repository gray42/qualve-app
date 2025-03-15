import axios from "axios";

// eslint-disable-next-line no-undef
//const baseURL = process.env.REACT_APP_API_BASE_URL;

//axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

//backend calls
export const fetchPosts = async () => {
  try {
    const { data } = await apiClient.get("/api/posts");
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

//new function to fetch post by id
export const fetchPostById = async (postId) => {
  try {
    const { data } = await apiClient.get(`/posts/${postId}`);
    return data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};
