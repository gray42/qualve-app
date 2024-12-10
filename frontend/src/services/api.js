import axios from "axios";

//const API_URL = "http://localhost:3000/api";

export const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/posts/");
    return response.data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};
