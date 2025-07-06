import PostDetails from "../components/post/PostDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";

export default function PostPage() {
  const { postId } = useParams();
  const {
    selectedPost,
    fetchPostById,
    loading,
    error,
    addAnswerToPost,
    handleVote,
  } = usePosts();
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
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Post Details */}
        <PostDetails post={selectedPost} />

        {/* Answers */}
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Answers</h2>
          {selectedPost.answers.length === 0 ? (
            <p className="text-gray-500">
              No answers yet. Be the first to respond!
            </p>
          ) : (
            selectedPost.answers.map((answer, index) => (
              <div
                key={index}
                className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-5"
              >
                <p className="text-gray-800">{answer.body}</p>
                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-gray-500">
                    Answered by: {answer.username || "unknown"}
                  </p>
                  <div className="mt-2 flex space-x-4 sm:mt-0">
                    <button
                      onClick={() => handleVote(postId, "upvote", answer._id)}
                      className="flex items-center space-x-1 text-sm font-medium text-green-600 hover:underline"
                    >
                      <span>⬆️</span>
                      <span>{answer.upvotes}</span>
                    </button>
                    <button
                      onClick={() => handleVote(postId, "downvote", answer._id)}
                      className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:underline"
                    >
                      <span>⬇️</span>
                      <span>{answer.downvotes}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Answer Submission Form */}
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Your Answer
          </h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <textarea
              rows="4"
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit Answer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
