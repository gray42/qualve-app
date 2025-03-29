import PostDetails from "../components/post/PostDetails";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostPage() {
  // get the postId from the URL
  const { postId } = useParams();
  // Get logged-in user
  //const { user } = useUser();
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
      {/* <div className="mt-4">
        <h2>Add Answer</h2>
        <form onSubmit={handleAddAnswer}>
          <textarea
            rows="4"
            placeholder="Write answer here..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <button
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Submit Answer
          </button>
        </form>
      </div> */}
    </div>
  );
}
