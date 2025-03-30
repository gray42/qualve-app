import PostList from "../components/post/PostList";
import Sidebar from "../components/sidebar/Sidebar";
import { usePosts } from "../context/PostContext";

export default function Home() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Sidebar />
      <div className="bg-white">
        <PostList posts={posts} />
      </div>
    </>
  );
}
