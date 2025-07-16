import { useState, useEffect } from "react";
import { getTagSuggestions } from "../../services/api";

export default function TagAutocomplete({ selectedTags, setSelectedTags }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // if query is blank
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    // fetch tag suggestions whenever query changes
    const fetchSuggestions = async () => {
      try {
        const data = await getTagSuggestions(query);
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleAddTag = (tag) => {
    // add tag to array
    if (!selectedTags.find((t) => t._id === tag._id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setQuery("");
    setSuggestions([]);
  };

  const handleRemoveTag = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag._id !== tagId));
  };

  return (
    <div className="relative max-w-md">
      <input
        type="text"
        value={query}
        placeholder="Type to search tags..."
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      {/* Suggestions dropdown */}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg">
          {suggestions.map((tag) => (
            <li
              key={tag._id}
              onClick={() => handleAddTag(tag)}
              className="cursor-pointer px-4 py-2 transition hover:bg-indigo-600 hover:text-white"
            >
              {tag.name}
            </li>
          ))}
        </ul>
      )}

      {/* Selected tags */}
      <div className="mt-3 flex flex-wrap gap-2">
        {selectedTags.map((tag) => (
          <span
            key={tag._id}
            onClick={() => handleRemoveTag(tag._id)}
            className="flex cursor-pointer select-none items-center rounded-full bg-indigo-100 px-3 py-1 text-indigo-700 transition hover:bg-indigo-200"
          >
            {tag.name}
            <button
              type="button"
              aria-label={`Remove ${tag.name}`}
              className="ml-2 rounded-full p-1 text-indigo-500 hover:bg-indigo-300 hover:text-indigo-800 focus:outline-none"
            >
              ✕
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
