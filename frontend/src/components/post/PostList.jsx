import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../../context/UserContext";

export default function PostList({ posts }) {
  const { user } = useUser();
  if (!user) {
    return (
      <div className="mt-10 flex w-full flex-col items-center">
        <h1 className="mb-4 text-center text-2xl font-bold">
          User not authenticated. <br />
          Please log in to see posts.
        </h1>
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="mt-8 text-2xl font-bold">
          Welcome back, {user.username || "Guest"}!
        </h1>
        <p>Help others answer their questions or ask your own!</p>
        <div className="p-4">
          {posts.map((post) => (
            <div key={post._id} className="">
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
      </div>
    </>
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
