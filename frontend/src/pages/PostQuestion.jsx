import { usePosts } from "../context/PostContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PostPage() {
  const { addQuestionToPage } = usePosts();
  const [question, setQuestion] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tagsArray = tagsInput
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag !== "");

    try {
      if (question.trim()) {
        await addQuestionToPage(question, tagsArray);
        navigate("/");
      }
    } catch (error) {
      console.error("Error submitting question", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Post Question</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <textarea
            rows="4"
            placeholder="Write question here..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <input
            className="w-full rounded border p-2"
            placeholder="Tags (comma-separated, e.g., coding,react)"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
          <button
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Submit Question
          </button>
        </form>
      </div>
    </div>
  );
}
