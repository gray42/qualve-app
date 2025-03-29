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
        await fetchPostById(postId);
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
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-md">
        <PostDetails post={selectedPost} />
        <h3>Answer:</h3>
        {selectedPost.answers.map((answer, index) => (
          <div key={index} className="mt-4 rounded-md border bg-gray-100 p-4">
            <p>{answer.body}</p>
          </div>
        ))}
        {/* comments section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800">Add Answer</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <textarea
              rows="4"
              placeholder="Write answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              type="submit"
            >
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
