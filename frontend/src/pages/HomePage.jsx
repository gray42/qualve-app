import PostList from "../components/post/PostList";
import { useEffect } from "react";
import { usePostContext } from "../context/PostContext";

export default function Home() {
  const { posts, getPosts } = usePostContext();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="bg-white">
      <PostList posts={posts} />
    </div>
  );
}
