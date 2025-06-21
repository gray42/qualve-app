import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";

export default function SidebarRight() {
  const { trendingTags, hotPosts } = usePosts();

  return (
    <div className="min-h-screen w-1/4 bg-gray-100 p-4">
      <aside className="top-0 z-0 hidden h-screen w-72 flex-col border-l border-gray-200 bg-white p-4 lg:flex">
        {/* Trending Tags */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
            Trending Tags
          </h2>
          <ul className="space-y-2">
            {trendingTags.map((tag) => (
              <li key={tag._id}>
                <Link
                  to={`/tags/${tag._id}`}
                  className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  #{tag._id} ({tag.count})
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Hot Posts */}
        <section>
          <h2 className="mb-3 text-xl font-semibold">🔥 Hot Posts</h2>
          <ul className="space-y-2">
            {hotPosts.map((post) => (
              <li key={post._id}>
                <Link
                  to={`/posts/${post._id}`}
                  className="block text-sm text-gray-800 transition hover:text-blue-700 hover:underline"
                >
                  {post.title}
                </Link>
                <div className="text-sm text-gray-500">
                  Score: {post.upvotes - post.downvotes}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
