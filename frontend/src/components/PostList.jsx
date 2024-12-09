import { useEffect, useState } from "react";
import { fetchPosts } from "../services/api";
import PostCard from "./PostCard";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error loading posts", error);
      }
    };

    getPosts();
  }, []);
  return (
    <div className="">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
