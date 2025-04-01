/* 
import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { usePosts } from "../../context/PostContext";

export default function VoteButtons({
  postId,
  initialUpvotes,
  initialDownvotes,
  answerId = null,
}) {
  const { user } = useUser();
  const { handleVote, posts } = usePosts();
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  useEffect(() => {
    const post = posts.find((p) => p._id === postId);
    if (post) {
      if (answerId) {
        const answer = post.answers.find((a) => a._id === answerId);
        if (answer) {
          setUpvotes(answer.upvotes.length);
          setDownvotes(answer.downvotes.length);
        }
      } else {
        setUpvotes(post.upvotes.length);
        setDownvotes(post.downvotes.length);
      }
    }
  }, [posts, answerId, postId]);

  const handleVoteClick = async (voteType) => {
    if (!user) return alert("You must be logged in to vote!");

    try {
      const response = await handleVote(postId, voteType, answerId);
      if (response && response.post) {
        setUpvotes(response.post.upvotes.length);
        setDownvotes(response.post.downvotes.length);
      }
    } catch (error) {
      console.error("Voting error", error.response);
    }
  };

  return (
    <>
      <button
        className="border-radius rounded-lg bg-slate-500"
        onClick={() => handleVoteClick("upvote")}
      >
        ⬆ Upvote {upvotes}
      </button>
      <button
        className="border-radius rounded-lg bg-slate-500"
        onClick={() => handleVoteClick("downvote")}
      >
        ⬇ Downvote {downvotes}
      </button>
    </>
  );
}
 */
