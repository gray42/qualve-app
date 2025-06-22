import { useEffect } from "react";
import PostList from "../components/post/PostList";
import { usePosts } from "../context/PostContext";

const HotPostsPage = () => {
  const { loadHotPosts, hotPosts } = usePosts();

  useEffect(() => {
    const fetchData = async () => {
      await loadHotPosts();
    };

    fetchData();
  }, [loadHotPosts]);

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">🔥 Hot Posts</h2>
      <PostList posts={hotPosts} showWelcome={false} />
    </>
  );
};

export default HotPostsPage;
