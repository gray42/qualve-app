import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PostList({ posts }) {
  return (
    // map through the posts array and render a PostCard component for each post with an anchor tag that links to the post's unique page
    <div className="">
      {posts.map((post) => (
        <div key={post._id} className="mx-auto w-[50%]">
          <Link to={`/post/${post._id}`} className="block w-full">
            <PostCard
              title={post.title}
              author={post.username || "Guest"}
              votes={post.votes}
              time={post.createdAt}
              answers={post.answers.length}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      username: PropTypes.string,
      votes: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      answers: PropTypes.array.isRequired,
    }),
  ).isRequired,
};
