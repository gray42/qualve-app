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
    <div className="m-4 mx-auto w-[50%] rounded-lg bg-white p-6 drop-shadow-md">
      {/* post */}
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">
        {post.title}
      </h1>

      <div className="space-y-2 text-gray-700">
        <p>
          <strong className="text-gray-900">Author:</strong>{" "}
          {post.author?.username}
        </p>
        <p>
          <strong className="text-gray-900">Published:</strong>{" "}
          <TimeAgo createdAt={post.createdAt} />
        </p>
      </div>

      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => handleVote(post._id, "upvote")}
          className="text-green-500"
        >
          ⬆️ {post.upvotes}
        </button>
        <button
          onClick={() => handleVote(post._id, "downvote")}
          className="text-red-500"
        >
          ⬇️ {post.downvotes}
        </button>
      </div>
    </div>
  );
}
