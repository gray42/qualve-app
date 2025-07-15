import TimeAgo from "../../utils/TimeAgo";
import { usePosts } from "../../context/PostContext";
import { Link } from "react-router-dom";

//post details component to display individual post

export default function PostDetails({ post }) {
  const { handleVote } = usePosts();

  if (!post) {
    return <div className="text-center text-gray-600">Post not found...</div>;
  }

  return (
    <article className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      {/* Header Section */}
      <div className="border-b border-gray-50 p-6">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900">
          {post.title}
        </h1>

        {/* Author and Meta Info */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-medium text-white">
                {post.username?.charAt(0).toUpperCase() || "A"}
              </div>
              <span className="font-medium text-gray-800">{post.username}</span>
            </div>
            <span className="text-gray-400">•</span>
            <TimeAgo createdAt={post.createdAt} />
          </div>

          {/* Vote Count Summary */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            {post.upvotes == 1 ? (
              <div className="flex items-center space-x-1">
                <span className="font-medium text-green-600">
                  {post.upvotes}
                </span>
                <span>upvote</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="font-medium text-green-600">
                  {post.upvotes}
                </span>
                <span>upvotes</span>
              </div>
            )}
            {post.downvotes == 1 ? (
              <div className="flex items-center space-x-1">
                <span className="font-medium text-red-600">
                  {post.downvotes || 0}
                </span>
                <span>downvote</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <span className="font-medium text-red-600">
                  {post.downvotes || 0}
                </span>
                <span>downvotes</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags Section */}
      {post.tags && post.tags.length > 0 && (
        <div className="border-b border-gray-100 bg-gray-50 px-6 py-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link
                to={`/tags/${tag}`}
                key={index}
                className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Voting Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleVote(post._id, "upvote")}
              className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-green-200 hover:bg-green-50 hover:text-green-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
              <span>Upvote</span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {post.upvotes || 0}
              </span>
            </button>

            {/* onClick={() => handleAction("vote")} */}
            <button
              onClick={() => handleVote(post._id, "downvote")}
              className="flex items-center space-x-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <span>Downvote</span>
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                {post.downvotes || 0}
              </span>
            </button>
          </div>

          {/* Additional Actions */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 hover:bg-gray-100">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
