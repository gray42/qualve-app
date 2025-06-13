import { Link } from "react-router-dom";

export default function SidebarRight() {
  const trendingTags = ["javascript", "react", "mongodb", "express", "node.js"];
  const topPosts = [
    { title: "How to optimize React rendering?", link: "/questions/1" },
    { title: "MongoDB aggregation vs joins", link: "/questions/2" },
    { title: "Understanding closures in JavaScript", link: "/questions/3" },
  ];

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
              <li key={tag}>
                <Link
                  to={`/tags/${tag}`}
                  className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  #{tag}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Hot Posts */}
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-700">
            Hot Posts
          </h2>
          <ul className="space-y-3">
            {topPosts.map(({ title, link }) => (
              <li key={link}>
                <Link
                  to={link}
                  className="block text-sm text-gray-800 transition hover:text-blue-700 hover:underline"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
