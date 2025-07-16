import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import TagAutocomplete from "../components/tags/TagAutocomplete";

export default function PostPage() {
  const { addQuestionToPage } = usePosts();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedTags = formData.tags.map((tag) => tag._id);
      await addQuestionToPage(formData.title, formData.body, selectedTags);
      navigate("/");
    } catch (error) {
      console.error("Error submitting question", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Post Question</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <h3>Question Title</h3>
            <textarea
              rows="1"
              placeholder="(ie) what is matrix multiplication..."
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full rounded-md border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <h3>Question Body</h3>
            <MDEditor
              data-color-mode="light"
              value={formData.body}
              onChange={(value) => setFormData({ ...formData, body: value })}
              className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <h3>Tags</h3>
            <TagAutocomplete
              selectedTags={formData.tags}
              setSelectedTags={(tags) =>
                setFormData((prev) => ({ ...prev, tags }))
              }
            />
          </div>

          <button
            className="w-auto rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}
