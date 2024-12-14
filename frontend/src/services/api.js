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
