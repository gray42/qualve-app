import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTags } from "../context/TagContext";

import MDEditor from "@uiw/react-md-editor";
import TagAutocomplete from "../components/tags/TagAutocomplete";

export default function PostPage() {
  const { addQuestionToPage } = usePosts();
  const { fetchTrendingTags } = useTags();
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
      fetchTrendingTags();
      navigate("/");
    } catch (error) {
      console.error("Error submitting question", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 sm:px-12 lg:px-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-6 border-b border-gray-200 pb-2 text-2xl font-bold text-gray-900">
          Post a Question
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Question Title
            </label>
            <textarea
              id="title"
              rows={2}
              placeholder="How would you summarize your question in one sentence?"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 placeholder-gray-400 shadow-sm transition focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label
              htmlFor="body"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              Question Body
            </label>
            <MDEditor
              id="body"
              data-color-mode="light"
              value={formData.body}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, body: value }))
              }
              className="w-full rounded-md border border-gray-300 p-3 text-gray-900 shadow-sm transition focus-within:border-indigo-600 focus-within:ring-2 focus-within:ring-indigo-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Tags
            </label>
            <TagAutocomplete
              selectedTags={formData.tags}
              setSelectedTags={(tags) =>
                setFormData((prev) => ({ ...prev, tags }))
              }
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}
