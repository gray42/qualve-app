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
                className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 transition hover:bg-blue-200"
              >
                <Link to={`/tags/${tag.name}`} className="text-blue-600">
                  {tag.name}
                </Link>
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
