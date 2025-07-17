import { useEffect } from "react";
import { useTags } from "../context/TagContext";
import TagList from "../components/tags/TagList";

export default function TagPage() {
  const { tags, fetchTags, loading, error } = useTags();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex">
        <TagList tags={tags} />
      </div>
    </>
  );
}
