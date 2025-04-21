import { useState, useEffect } from "react";

import { getTags } from "../../services/api";

export default function TagInput({ value, onChange }) {
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const data = await getTags();
        setAllTags(data);
      } catch (error) {
        console.error("Error fetching tags.", error);
      }
    };

    fetchTags();
  }, []);

  return <></>;
}
