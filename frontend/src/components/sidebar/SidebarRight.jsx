import { Link } from "react-router-dom";
import { usePosts } from "../../context/PostContext";
import { useTags } from "../../context/TagContext";

export default function SidebarRight() {
  const { hotPosts } = usePosts();
  const { trendingTags } = useTags();

  return (
    <aside className="flex flex-col p-4">
      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          Trending Tags
        </h2>
        <ul className="space-y-2">
          {trendingTags.map((tag) => (
            <li key={tag._id}>
              <Link
                to={`/tags/${tag.name}`}
                className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
              >
                #{tag.name} ({tag.count})
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
          <Link to="/hot" className="hover:underline">
            Hot Posts
          </Link>
        </h2>
        <ul className="space-y-2">
          {hotPosts.map((post) => (
            <li key={post._id}>
              <Link
                to={`/posts/${post._id}`}
                className="block text-sm text-gray-800 hover:text-blue-700 hover:underline"
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
  );
}
