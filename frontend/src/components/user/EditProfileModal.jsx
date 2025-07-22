import { useState } from "react";
import { updateUserById } from "../../services/api";

const classCategories = [
  { key: "english", label: "English" },
  { key: "math", label: "Math" },
  { key: "history", label: "History" },
  { key: "science", label: "Science" },
  { key: "other", label: "Other" },
];

const EditProfileModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    bio: user.bio || "",
    school: user.school || "",
    classes: user.classes || {
      english: "",
      math: "",
      history: "",
      science: "",
      other: "",
    },
    grade: user.grade || "",
    birthday: user.birthday ? user.birthday.split("T")[0] : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("class_")) {
      const cat = name.replace("class_", "");
      setFormData((prev) => ({
        ...prev,
        classes: { ...prev.classes, [cat]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = await updateUserById(user._id, formData);
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">Edit Profile</h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 transition-colors hover:bg-white hover:bg-opacity-20"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 p-6">
            {/* Personal Information Section */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                Personal Information
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Grade Level
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                  >
                    <option value="">Select Grade</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  School
                </label>
                <input
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                  placeholder="Your school or institution"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
              </div>
            </div>

            {/* Academic Experience Section */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                Academic Experience
              </h4>
              <p className="mb-4 text-sm text-gray-600">
                Share the classes you're taking or have taken to help others
                find you for academic support.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {classCategories.map((cat) => (
                  <div key={cat.key} className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-blue-500"></span>
                      {cat.label}
                    </label>
                    <input
                      type="text"
                      name={`class_${cat.key}`}
                      value={formData.classes?.[cat.key] || ""}
                      onChange={handleChange}
                      placeholder={`e.g., ${cat.label === "Other" ? "AP Computer Science, Art History" : cat.label + " 101, Honors " + cat.label}`}
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <svg
                  className="mr-1 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Separate multiple classes with commas
              </div>
            </div>

            {/* About Section */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-4 text-lg font-semibold text-gray-900">
                About You
              </h4>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell others about yourself, your interests, and how you like to learn..."
                  rows="4"
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                />
                <div className="mt-2 text-xs text-gray-500">
                  {formData.bio.length}/500 characters
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 px-6 py-4">
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
