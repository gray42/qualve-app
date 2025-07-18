import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function UserList() {
  const { user, users, getAllUsers } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="mb-6 text-3xl font-semibold text-gray-800">
        Qualve Users
      </h1>
      {users.map((u, idx) => (
        <div
          key={idx}
          onClick={() => handleClick(u)}
          className={
            "cursor-pointer rounded-xl border p-4 shadow-sm transition-all duration-150 hover:shadow-md"
          }
        >
          <p className="text-sm text-gray-800">
            <strong className="font-medium text-gray-900">
              {u.name || u.username}
            </strong>
          </p>
        </div>
      ))}
    </div>
  );
}
