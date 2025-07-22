import { useUser } from "../../context/UserContext";

const AboutTab = ({ user, onUpdate, onEdit }) => {
  const { user: currentUser } = useUser();
  const isOwnProfile = currentUser?._id === user._id;

  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">About</h2>
        {isOwnProfile && (
          <button
            onClick={onEdit}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Basic Information Section */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
            <svg
              className="mr-2 h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <span className="text-sm font-medium text-gray-500">Name</span>
              <p className="mt-1 text-gray-900">
                {user.name || "Not provided"}
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <span className="text-sm font-medium text-gray-500">Grade</span>
              <p className="mt-1 text-gray-900">
                {user.grade ? `${user.grade}th Grade` : "Not provided"}
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <span className="text-sm font-medium text-gray-500">School</span>
              <p className="mt-1 text-gray-900">
                {user.school || "Not provided"}
              </p>
            </div>
            <div className="rounded-lg bg-white p-3 shadow-sm">
              <span className="text-sm font-medium text-gray-500">Age</span>
              <p className="mt-1 text-gray-900">
                {user.age
                  ? new Date(user.age).toLocaleDateString()
                  : "Not provided"}
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg bg-white p-3 shadow-sm">
            <span className="text-sm font-medium text-gray-500">Bio</span>
            <p className="mt-1 text-gray-900">
              {user.bio || "No bio provided yet."}
            </p>
          </div>
        </div>

        {/* Academic Profile Section */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
            <svg
              className="mr-2 h-5 w-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Academic Profile
          </h3>

          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <span className="mb-2 block text-sm font-medium text-gray-500">
                Class Experience
              </span>
              {user.classes &&
              Object.values(user.classes).some((val) => val) ? (
                <div className="flex flex-wrap gap-2">
                  {Object.entries(user.classes).map(
                    ([key, value]) =>
                      value && (
                        <div
                          key={key}
                          className="rounded-lg bg-blue-50 p-2 text-sm"
                        >
                          <span className="font-medium capitalize text-blue-800">
                            {key}:
                          </span>
                          <span className="ml-1 text-blue-700">{value}</span>
                        </div>
                      ),
                  )}
                </div>
              ) : (
                <p className="text-gray-500">No classes listed</p>
              )}
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              <span className="mb-2 block text-sm font-medium text-gray-500">
                Academic Interests
              </span>
              {user.academicInterests?.length ? (
                <div className="flex flex-wrap gap-2">
                  {user.academicInterests.map((interest) => (
                    <span
                      key={interest}
                      className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No interests listed</p>
              )}
            </div>
          </div>
        </div>

        {/* Platform Stats Section */}
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-900">
            <svg
              className="mr-2 h-5 w-5 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Platform Activity
          </h3>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {user.reputation || 0}
              </div>
              <div className="text-sm text-gray-600">Reputation</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {user.stats?.answersGiven || 0}
              </div>
              <div className="text-sm text-gray-600">Answers</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-purple-600">
                {user.stats?.questionsAsked || 0}
              </div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="rounded-lg bg-white p-4 text-center shadow-sm">
              <div className="text-2xl font-bold text-orange-600">
                {user.createdAt
                  ? new Date(user.createdAt).getFullYear()
                  : "N/A"}
              </div>
              <div className="text-sm text-gray-600">Joined</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
