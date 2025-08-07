import PostCard from "./PostCard";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

export default function PostList({ posts, showWelcome = true }) {
  const { user } = useUser();
  const [tag, setTag] = useState("");

  const tags = [
    ...new Set(
      posts.flatMap((post) =>
        (post.tags || [])
          .filter((t) => t && t.name)
          .map((t) => t.name.toString().toLowerCase()),
      ),
    ),
  ];

  const filteredPosts = posts.filter((post) =>
    tag === ""
      ? true
      : (post.tags || []).map((t) => t.name.toLowerCase()).includes(tag),
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Welcome Section */}
        {showWelcome && user && (
          <div className="mb-8">
            <div className="text-center">
              <h1 className="mb-2 text-4xl font-bold text-gray-800">
                Welcome back, {user.username || "Guest"}!
              </h1>
              <p className="text-lg text-gray-600">
                Help others answer their questions or ask your own!
              </p>
              <Link
                to="/post"
                className="mt-4 inline-block transform rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        )}

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Community Questions
            </h2>
            <p className="text-gray-600">
              {filteredPosts.length} question
              {filteredPosts.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="w-full sm:w-64">
            <label
              htmlFor="tag-filter"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Filter by Tag
            </label>
            <div className="relative">
              <select
                id="tag-filter"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-3 pr-10 text-sm text-gray-800 shadow-sm transition-all duration-200 hover:border-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All Posts</option>
                {tags.map((t, idx) => (
                  <option key={idx} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <div
                key={post._id}
                className="transform transition-all duration-200 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="rounded-xl bg-white p-1 shadow-lg">
                  <PostCard
                    postId={post._id}
                    title={post.title}
                    author={post.author || "Guest"}
                    upvotes={post.upvotes}
                    downvotes={post.downvotes}
                    time={post.createdAt}
                    answers={post.answers.length}
                    tags={post.tags}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-xl bg-white p-12 text-center shadow-lg">
              <div className="mx-auto mb-4 h-24 w-24 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-800">
                No questions found
              </h3>
              <p className="mb-4 text-gray-600">
                {tag
                  ? `No questions found with the tag "${tag}".`
                  : "No questions have been posted yet."}
              </p>
              {tag && (
                <button
                  onClick={() => setTag("")}
                  className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
