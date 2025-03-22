import PropTypes from "prop-types";
import TimeAgo from "../../utils/TimeAgo";

//post details component to display individual post

export default function PostDetails({ post }) {
  if (!post) {
    return <div className="text-center text-gray-600">Post not found...</div>;
  }

  PostDetails.propTypes = {
    post: PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.shape({
        username: PropTypes.string,
      }),
      createdAt: PropTypes.string,
    }),
  };

  return (
    //make the formatting better (MVP as of now)
    <div className="m-4 mx-auto w-[50%] rounded-lg bg-white p-6 drop-shadow-md">
      <h1 className="mb-4 text-3xl font-semibold text-gray-900">
        {post.title}
      </h1>
      {/* <p>{post.content}</p> */}
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
    </div>
  );
}
