import { useState } from "react";
import { useUser } from "../../context/UserContext";
import EditProfileModal from "./EditProfileModal";

const AboutTab = ({ user, onUpdate }) => {
  const { user: currentUser } = useUser();
  const isOwnProfile = currentUser?._id === user._id;
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded bg-white p-4 shadow">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">About</h2>
        {isOwnProfile && (
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Edit Profile
          </button>
        )}
      </div>

      <ul className="space-y-2">
        <li>
          <strong>Full Name:</strong> {user.name || "Not provided"}
        </li>
        <li>
          <strong>Bio:</strong> {user.bio || "No bio yet"}
        </li>
        <li>
          <strong>School:</strong> {user.school || "Not provided"}
        </li>
        <li>
          <strong>Birthday:</strong>{" "}
          {user.birthday
            ? new Date(user.birthday).toLocaleDateString()
            : "Not provided"}
        </li>
        <li>
          <strong>Join Date:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </li>
        <li>
          <strong>Academic Class Experience:</strong>{" "}
          {user.classes || "Not provided"}
        </li>
      </ul>

      {editing && (
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
          onSave={onUpdate}
        />
      )}
    </div>
  );
};

export default AboutTab;
