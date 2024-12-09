import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const fetchPosts = async () => {
  try {
    const response = await API.get("/api/posts/");
    return response.data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};
