import axios from "axios";

//axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

//backend calls
export const fetchPosts = async () => {
  try {
    const response = await apiClient.get("/posts");
    return response.data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};

//new function to fetch post by id
export const fetchPostById = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};
