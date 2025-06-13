import { useState } from "react";
import { updateUserById } from "../../services/api";

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    school: user.school || "",
    classes: user.classes || "",
    birthday: user.birthday ? user.birthday.split("T")[0] : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUserById(user._id, formData);
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded bg-white p-6 shadow"
      >
        <h3 className="text-lg font-semibold">Edit Profile</h3>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2"
        />
        <input
          name="classes"
          value={formData.classes}
          onChange={handleChange}
          placeholder="Classes"
          className="w-full border p-2"
        />
        <input
          name="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="School"
          className="w-full border p-2"
        />
        <input
          name="birthday"
          type="date"
          value={formData.birthday}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full border p-2"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="text-gray-500">
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-1 text-white"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileModal;
