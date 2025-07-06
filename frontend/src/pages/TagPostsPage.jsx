import { useEffect } from "react";
import PostList from "../components/post/PostList";
import { usePosts } from "../context/PostContext";
import { useParams } from "react-router-dom";

export default function TagPostsPage() {
  const { tagId } = useParams();
  const { posts, fetchPostsByTag, loading, error } = usePosts();

  useEffect(() => {
    fetchPostsByTag(tagId);
  }, [tagId, fetchPostsByTag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">#{tagId}</h2>
      <PostList posts={posts} showWelcome={false} />
    </>
  );
}
