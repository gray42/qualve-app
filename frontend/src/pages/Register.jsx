import { useUser } from "../context/UserContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const { register } = useUser();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "learner",
    age: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Registering user...");

    if (!userData.username || !userData.email || !userData.password) {
      toast.error("Please fill in username, email, and password");
      return;
    }

    // Specifically check for role
    if (!userData.role) {
      toast.error("Please select a role (learner or tutor)");
      return;
    }

    // Validate role value
    if (userData.role !== "learner" && userData.role !== "tutor") {
      toast.error("Please select a valid role");
      return;
    }

    try {
      await register(userData);
      toast.success("User signed up!");
      navigate("/check-email");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-left text-xl text-indigo-900">Qualve</h1>
      <h2 className="mb-6 text-center text-2xl font-bold">Sign up now</h2>

      <form onSubmit={registerUser} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter a username..."
          className="sm:text mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
        <label className="block text-sm font-medium text-gray-700">
          School Email
        </label>
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter a school email..."
          className="sm:text mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="text"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter a password..."
          className="sm:text mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />

        {/* Add a dropdown for the role */}
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          name="role"
          value={userData.role}
          onChange={handleChange}
          required
        >
          <option value="tutor">Tutor</option>
          <option value="learner">Learner</option>
        </select>

        <label className="block text-sm font-medium text-gray-700">Age</label>
        <input
          type="number"
          name="age"
          placeholder="Enter your age..."
          className="sm:text mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
        <button
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
