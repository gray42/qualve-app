import PostList from "../components/post/PostList";
import Sidebar from "../components/sidebar/Sidebar";
import { usePosts } from "../context/PostContext";
import { useEffect } from "react";

export default function Home() {
  const { posts, loading, error, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex">
        <Sidebar />
        <PostList posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
