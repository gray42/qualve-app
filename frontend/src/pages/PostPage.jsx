import PostDetails from "../components/post/PostDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../context/PostContext";
import { useUser } from "../context/UserContext";

import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";

export default function PostPage() {
  const { postId } = useParams();
  const { user } = useUser();

  const {
    selectedPost,
    fetchPostById,
    loading,
    error,
    addAnswerToPost,
    handleVote,
    approveAnswer,
  } = usePosts();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    fetchPostById(postId);
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (answer.trim()) {
        await addAnswerToPost(postId, answer);
        await fetchPostById(postId);
        setAnswer("");
      }
    } catch (error) {
      console.error("Error submitting answer", error);
    }
  };

  const handleApproveAnswer = async (answerId) => {
    try {
      await approveAnswer(postId, answerId);
      await fetchPostById(postId);
    } catch (error) {
      console.error("Error approving answer:", error);
      alert(error.response?.data?.message || "Error approving answer");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading post: {error.message}</div>;
  }
  if (!selectedPost) {
    return <div>Post not found...</div>;
  }

  const isPostAuthor = user && user.username === selectedPost.username;
  const complete = selectedPost.isAnswered;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-lg">
        {/* Post Details */}
        <PostDetails post={selectedPost} />

        {/* Answers */}
        <div className="mt-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              Answers{" "}
              {selectedPost.answers.length > 0 && (
                <span className="text-lg font-normal text-gray-500">
                  ({selectedPost.answers.length})
                </span>
              )}
            </h2>
          </div>

          {selectedPost.answers.length === 0 ? (
            <div className="rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 py-12 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                <svg
                  className="h-6 w-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="mb-2 text-lg text-gray-600">No answers yet</p>
              <p className="text-gray-500">
                Be the first to help solve this question!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedPost.answers.map((answer, index) => (
                <div
                  key={index}
                  className={`relative rounded-xl border-2 p-6 transition-all duration-200 hover:shadow-md ${
                    answer.isApproved
                      ? "border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  {/* Approved Badge - Top Right */}
                  {answer.isApproved && (
                    <div className="absolute right-4 top-4">
                      <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                        <svg
                          className="mr-1 h-3 w-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Approved Answer
                      </span>
                    </div>
                  )}

                  {/* Answer Content */}
                  <div className={`${answer.isApproved ? "pr-32" : ""}`}>
                    <div className="prose prose-gray max-w-none">
                      <ReactMarkdown className="text-base leading-relaxed text-gray-800">
                        {answer.body}
                      </ReactMarkdown>
                    </div>
                  </div>

                  {/* Answer Footer */}
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Author and Date Info */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100">
                            <span className="text-xs font-medium text-indigo-600">
                              {(answer.username || "U").charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium">
                            {answer.username || "Unknown"}
                          </span>
                        </div>
                        <span className="text-gray-300">•</span>
                        <span>
                          {new Date(answer.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-4">
                        {/* Voting Buttons */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleVote(postId, "upvote", answer._id)
                            }
                            className="flex items-center space-x-1 rounded-md px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-green-600"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 15l7-7 7 7"
                              />
                            </svg>
                            <span>{answer.upvotes || 0}</span>
                          </button>

                          <button
                            onClick={() =>
                              handleVote(postId, "downvote", answer._id)
                            }
                            className="flex items-center space-x-1 rounded-md px-3 py-1 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                            <span>{answer.downvotes || 0}</span>
                          </button>
                        </div>

                        {/* Approval Button - Only show for post author */}
                        {isPostAuthor && !complete && !answer.isApproved && (
                          <button
                            className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            onClick={() => handleApproveAnswer(answer._id)}
                          >
                            <svg
                              className="mr-2 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Mark as Answer
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Answer Submission Form */}
        {complete && (
          <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
            <div className="flex items-center">
              <span className="mr-2 text-xl text-green-600">✓</span>
              <h3 className="text-lg font-semibold text-green-800">
                Question Answered
              </h3>
            </div>
            <p className="mt-2 text-green-700">
              This question has been marked as answered. New answers are no
              longer being accepted.
            </p>
          </div>
        )}

        {!complete && (
          <div className="mt-12 border-t pt-8">
            <h2 className="text-xl font-semibold text-gray-800">
              Add Your Answer
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <MDEditor
                data-color-mode="light"
                rows="4"
                placeholder="Write your answer here..."
                value={answer}
                onChange={setAnswer}
                className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Submit Answer
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
