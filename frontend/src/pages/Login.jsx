import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const { login } = useUser();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("Registering user...");

    try {
      await login(userData);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border border-gray-300 bg-white p-6 shadow-lg">
      <h1 className="mb-4 text-left text-xl text-indigo-900">Qualve</h1>
      <h2 className="mb-6 text-center text-2xl font-bold">Log In</h2>

      <form onSubmit={loginUser} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter an email..."
          value={userData.email}
          onChange={handleChange}
          className="sm:text mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="Enter a password..."
          value={userData.password}
          onChange={handleChange}
          className="sm:text mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          required
        />
        <button
          className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          Log In
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <a className="text-indigo-600 hover:text-indigo-500" href="/signup">
          Sign up
        </a>
      </p>
    </div>
  );
}
