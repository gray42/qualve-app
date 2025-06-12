import PostCard from "../post/PostCard"; // assuming you already have a post display component
import { Link } from "react-router-dom";
const UserPostsTab = ({ posts }) => (
  <div>
    {posts.length > 0 ? (
      posts.map((post) => (
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
      ))
    ) : (
      <p>No posts yet.</p>
    )}
  </div>
);

export default UserPostsTab;
