import PostDetails from "../components/post/PostDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostPage() {
  // get the postId from the URL
  const { postId } = useParams();
  // get the selected post and the function to get a post by id from the context
  const { selectedPost, fetchPostById, loading, error } = usePosts();

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }
  if (!selectedPost) {
    return <div>Post not found...</div>;
  }

  return (
    <div className="bg-white">
      <PostDetails post={selectedPost} />
      {/* comments section */}
    </div>
  );
}
