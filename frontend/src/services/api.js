import axios from "axios";

//TODO: make axios instance, configure .env, look at best frontend + backend config

export const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/posts/");
    return response.data;
  } catch (error) {
    console.error("Error occurred fetching data", error);
    throw error;
  }
};
