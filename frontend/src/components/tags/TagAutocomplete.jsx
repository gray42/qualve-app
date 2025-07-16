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
    <div>
      <input
        type="text"
        value={query}
        placeholder="Type to search tags"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {suggestions.map((tag) => (
          <li key={tag._id} onClick={() => handleAddTag(tag)}>
            {tag.name}
          </li>
        ))}
      </ul>
      <div>
        {selectedTags.map((tag) => (
          <span key={tag._id} onClick={() => handleRemoveTag(tag._id)}>
            {tag.name} ✕
          </span>
        ))}
      </div>
    </div>
  );
}
