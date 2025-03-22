import PostDetails from "../components/post/PostDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostPage() {
  // get the postId from the URL
  const { postId } = useParams();
  // get the selected post and the function to get a post by id from the context
  const { selectedPost, fetchPostById } = usePosts();

  useEffect(() => {
    getPostById(postId);
  }, [postId, fetchPostById]);

  return (
    <div className="bg-white">
      <PostDetails post={selectedPost} />
      {/* comments section */}
    </div>
  );
}
