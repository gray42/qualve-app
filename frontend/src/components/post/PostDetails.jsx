import PropTypes from "prop-types";
import TimeAgo from "../../utils/TimeAgo";
import { usePosts } from "../../context/PostContext";

//post details component to display individual post

export default function PostDetails({ post }) {
  const { handleVote } = usePosts();

  if (!post) {
    return <div className="text-center text-gray-600">Post not found...</div>;
  }

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

      {/* Voting Section */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => handleVote(post._id, "upvote")}
          className="flex items-center space-x-1 text-sm font-medium text-green-600 hover:underline"
        >
          <span>⬆️</span>
          <span>{post.upvotes}</span>
        </button>
        <button
          onClick={() => handleVote(post._id, "downvote")}
          className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:underline"
        >
          <span>⬇️</span>
          <span>{post.downvotes}</span>
        </button>
      </div>
    </div>
  );
}
