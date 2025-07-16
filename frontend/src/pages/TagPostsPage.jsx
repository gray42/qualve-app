import { useEffect } from "react";
import PostList from "../components/post/PostList";
import { usePosts } from "../context/PostContext";
import { useParams } from "react-router-dom";

export default function TagPostsPage() {
  const { tag } = useParams();
  const { posts, fetchPostsByTag, loading, error } = usePosts();

  useEffect(() => {
    fetchPostsByTag(tag);
  }, [tag, fetchPostsByTag]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }

  return (
    <>
      <h1 className="text-3xl">#{tag}</h1>
      {posts.length === 0 && <p>No posts found.</p>}
      <PostList posts={posts} showWelcome={false} />
    </>
  );
}
