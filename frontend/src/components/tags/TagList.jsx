import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

export default function TagList({ tags }) {
  const { user } = useUser();
  const [query, setQuery] = useState("");

  const filteredTags = tags.filter((tag) =>
    tag.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-auto">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Tags</h1>
          <p className="text-gray-600">
            {tags.length} total tags • {filteredTags.length} showing
          </p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTags.length > 0 ? (
            filteredTags.map((tag) => (
              <div
                key={tag._id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <Link
                  to={`/tags/${encodeURIComponent(tag.name)}`}
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  #{tag.name}
                </Link>
                <p className="mt-2 text-sm text-gray-600">
                  {tag.description || "No description provided."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                  {tag.category && (
                    <span className="rounded-full bg-gray-100 px-2 py-1">
                      Subject: {tag.category}
                    </span>
                  )}

                  <span className="rounded-full bg-gray-100 px-2 py-1">
                    {tag.usageCount ?? 0} questions asked
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center italic text-gray-500">
              No tags found matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
