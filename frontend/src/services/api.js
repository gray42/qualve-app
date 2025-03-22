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
