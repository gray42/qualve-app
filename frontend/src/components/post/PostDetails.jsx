import PropTypes from "prop-types";
import TimeAgo from "../../utils/TimeAgo";
import { usePosts } from "../../context/PostContext";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

//post details component to display individual post

export default function PostDetails({ post }) {
  const { user } = useUser();
  const { handleVote, answered } = usePosts();
  const [isUpdating, setIsUpdating] = useState(false);

  if (!post) {
    return <div className="text-center text-gray-600">Post not found...</div>;
  }

  const handleToggleAnswered = async () => {
    if (user.username !== post.username) {
      alert("Only the question owner can update status!");
      return;
    }

    setIsUpdating(true);
    try {
      await answered(post._id);
    } catch (error) {
      alert("Failed to update post status");
    } finally {
      setIsUpdating(false);
    }
  };

  const isOwner = user && user.username === post.username;

  return (
    //make the formatting better (MVP as of now)
    <div className="my-6 w-full max-w-3xl rounded-2xl bg-white">
      {/* Post Title */}
      <h1 className="mb-6 text-4xl font-bold text-gray-900">{post.title}</h1>

      {/* Author and Time */}
      <div className="mb-6 text-sm text-gray-600">
        <p>
          <span className="font-medium text-gray-800">Author:</span>{" "}
          {post.username}
        </p>
        <p>
          <span className="font-medium text-gray-800">Published:</span>{" "}
          <TimeAgo createdAt={post.createdAt} />
        </p>
      </div>

      {isOwner ? (
        <button
          onClick={handleToggleAnswered}
          disabled={isUpdating}
          className={`rounded-lg px-4 py-2 font-medium transition-colors duration-200 ${
            post.isAnswered
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-blue-100 text-blue-800 hover:bg-blue-200"
          } mb-4 mt-0 disabled:cursor-not-allowed disabled:opacity-50`}
        >
          {isUpdating
            ? "Updating..."
            : post.isAnswered
              ? "✓ Answered"
              : "Mark as Answered"}
        </button>
      ) : (
        <button
          onClick={() =>
            alert("Only the post owner can update the answered status!")
          }
          className="cursor-not-allowed rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-500"
        >
          {post.isAnswered ? "✓ Answered" : "Mark as Answered"}
        </button>
      )}

      {/* Voting Section */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => handleVote(post._id, "upvote")}
          className="flex items-center space-x-1 text-lg font-medium text-green-600 hover:underline"
        >
          <span>⬆️</span>
          <span>{post.upvotes}</span>
        </button>
        <button
          onClick={() => handleVote(post._id, "downvote")}
          className="flex items-center space-x-1 text-lg font-medium text-red-600 hover:underline"
        >
          <span>⬇️</span>
          <span>{post.downvotes}</span>
        </button>
      </div>
    </div>
  );
}
