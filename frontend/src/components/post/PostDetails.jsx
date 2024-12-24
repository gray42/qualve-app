import PropTypes from "prop-types";

export default function PostDetails({ post }) {
  if (!post) return <p>Post not available.</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-lato text-3xl text-black">{post.title}</h1>
      <p>{post.content}</p>
      <p>
        <strong>Author:</strong> {post.author}
      </p>
      <p>
        <strong>Published:</strong> {post.date}
      </p>
    </div>
  );
}

PostDetails.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};
