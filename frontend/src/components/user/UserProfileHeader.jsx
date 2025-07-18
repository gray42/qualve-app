import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const UserProfileHeader = ({ user, onEdit }) => {
  const getReputationLevel = (reputation) => {
    if (reputation < 100) return { level: "Novice", color: "text-gray-500" };
    if (reputation < 500)
      return { level: "Intermediate", color: "text-blue-500" };
    if (reputation < 1000) return { level: "Expert", color: "text-green-500" };
    if (reputation < 5000) return { level: "Master", color: "text-yellow-500" };
    return { level: "Legend", color: "text-purple-500" };
  };

  const repLevel = getReputationLevel(user.reputation);
  // check for user profile ownership
  const { user: currentUser } = useUser();
  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="mb-6 border-b pb-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-800">
              {user.reputation}
            </span>
            <span
              className={`rounded-full px-2 py-1 text-xs font-medium ${repLevel.color} bg-gray-100`}
            >
              {repLevel.level}
            </span>
          </div>
          <p className="text-sm text-gray-500">Reputation</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-5">
        <div className="rounded-lg bg-blue-50 p-3 text-center">
          <div className="text-xl font-bold text-blue-600">
            {user.stats.questionsAsked}
          </div>
          <div className="text-sm text-gray-600">Questions</div>
        </div>
        <div className="rounded-lg bg-green-50 p-3 text-center">
          <div className="text-xl font-bold text-green-600">
            {user.stats.answersGiven}
          </div>
          <div className="text-sm text-gray-600">Answers</div>
        </div>
        <div className="rounded-lg bg-purple-50 p-3 text-center">
          <div className="text-xl font-bold text-purple-600">
            {user.stats.answersApproved}
          </div>
          <div className="text-sm text-gray-600">Approved</div>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 text-center">
          <div className="text-xl font-bold text-emerald-600">
            {user.stats.upvotesReceived}
          </div>
          <div className="text-sm text-gray-600">Upvotes</div>
        </div>
        <div className="rounded-lg bg-red-50 p-3 text-center">
          <div className="text-xl font-bold text-red-600">
            {user.stats.downvotesReceived}
          </div>
          <div className="text-sm text-gray-600">Downvotes</div>
        </div>
      </div>

      {/* Bio */}
      {user.bio && (
        <div className="rounded-lg bg-gray-50 p-3">
          <p className="italic text-gray-700">{user.bio}</p>
        </div>
      )}

      {isOwnProfile && ( // if the logged in user is the profile owner then display the ability to ask a question or edit profile
        <div className="mt-4 flex gap-2">
          <Link
            to="/post"
            className="mt-8 rounded bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Ask Question
          </Link>
          <button
            onClick={onEdit}
            className="mt-8 rounded bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileHeader;
