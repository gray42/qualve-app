import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function PostList({ posts }) {
  const { user } = useUser();

  return (
    <>
      <div className="w-full">
        {user && (
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold">
              Welcome back, {user.username || "Guest"}!
            </h1>
            <p className="text-gray-600">
              Help others answer their questions or ask your own!
            </p>
          </div>
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
                  tags={post.tags}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
