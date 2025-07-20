import { FaSearch } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchAPI } from "../../services/api";
import debounce from "lodash.debounce";

export default function Searchbar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    users: [],
    posts: [],
    tags: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // fetch results from query
  const fetchResults = debounce(async (q) => {
    if (!q.trim()) {
      // no query
      return setResults({
        users: [],
        posts: [],
        tags: [],
      });
    }
    try {
      const searchResults = await searchAPI(q);
      setResults(searchResults);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }, 300);

  useEffect(() => {
    fetchResults(query);
    return fetchResults.cancel;
  }, [query]); //when query changes

  const handleSelect = (type, item) => {
    setShowDropdown(false);
    setQuery("");
    if (type === "user") navigate(`/${item._id}/public-profile`);
    if (type === "post") navigate(`/post/${item._id}`);
    if (type === "tag") navigate(`/tags/${item}`);
  };

  return (
    <div className="relative w-full max-w-2xl rounded-full bg-slate-100 px-4 py-2 shadow-sm">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
        <FaSearch />
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="text-md w-full bg-transparent pl-8 outline-none"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {showDropdown &&
        results &&
        (results.users.length > 0 ||
          results.posts.length > 0 ||
          results.tags.length > 0) && (
          <div className="absolute left-0 top-full z-50 mt-2 max-h-80 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-md">
            {results.users.map((u) => (
              <div
                key={u._id}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => handleSelect("user", u)}
              >
                👤 {u.username}
              </div>
            ))}
            {results.posts.map((p) => (
              <div
                key={p._id}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => handleSelect("post", p)}
              >
                📝 {p.title}
              </div>
            ))}
            {results.tags.map((tag) => (
              <div
                key={tag._id}
                className="cursor-pointer px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => handleSelect("tag", tag.name)}
              >
                🏷️ #{tag.name}
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
