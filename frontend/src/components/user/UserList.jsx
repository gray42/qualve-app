import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function UserList() {
  const { user: currentUser, users, getAllUsers } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const filteredUsers = users
    .filter(
      (u) =>
        u._id !== currentUser?._id &&
        (u.username.toLowerCase().includes(query.trim().toLowerCase()) ||
          u.name?.toLowerCase().includes(query.trim().toLowerCase())),
    )
    .sort((a, b) => (b.reputation || 0) - (a.reputation || 0));

  return (
    <div className="w-auto">
      <div className="p-4">
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600">
            {users.length} total users • {filteredUsers.length} showing
          </p>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.length > 0 ? (
            filteredUsers
              .filter((u) => u._id !== currentUser?._id)
              .map((u) => (
                <div
                  key={u._id}
                  className={
                    "cursor-pointer rounded-xl border p-4 shadow-sm transition-all duration-150 hover:shadow-md"
                  }
                >
                  <Link to={`/${u._id}/public-profile`}>
                    <p className="text-sm text-gray-800">
                      <strong className="font-lg text-gray-900">
                        {u.username}
                      </strong>{" "}
                      <br />
                      <span className="font-xs text-gray-900">{u.name}</span>
                      <br />
                      {u.grade && (
                        <span className="font-xs text-slate-500">
                          {u.grade}th grade
                        </span>
                      )}
                    </p>
                  </Link>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-2 py-1">
                      Reputation: {u.reputation}
                    </span>
                  </div>
                </div>
              ))
          ) : (
            <div className="col-span-full text-center italic text-gray-500 dark:text-gray-400">
              No users found matching "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
