import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../../context/UserContext";

export default function PostList({ posts }) {
  const { user } = useUser();

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        {user && (
          <>
            <h1 className="mt-8 text-2xl font-bold">
              Welcome back, {user.username || "Guest"}!
            </h1>
            <p>Help others answer their questions or ask your own!</p>
          </>
        )}

        <div className="p-4">
          {posts.map((post) => (
            <div key={post._id} className="">
              <Link to={`/post/${post._id}`} className="block w-full">
                <PostCard
                  title={post.title}
                  author={post.username || "Guest"}
                  upvotes={post.upvotes}
                  downvotes={post.downvotes}
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
