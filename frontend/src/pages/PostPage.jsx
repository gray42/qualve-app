import PostDetails from "../components/post/PostDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostPage() {
  const { postId } = useParams();
  const { selectedPost, fetchPostById, loading, error, addAnswerToPost } =
    usePosts();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (answer.trim()) {
        await addAnswerToPost(postId, answer);
        setAnswer("");
      }
    } catch (error) {
      console.error("Error submitting answer", error);
    }
  };

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
      <div className="mt-4">
        <h2>Add Answer</h2>
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
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
      </div>
    </div>
  );
}
