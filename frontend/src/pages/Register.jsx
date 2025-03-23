import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default function Register() {
  const { register } = useUser();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    age: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    console.log("Registering user...");

    try {
      await register(userData);
      navigate("/");
    } catch (error) {
      console.error("Error registering user", error);
      throw error;
    }
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={registerUser}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          placeholder="Enter a username..."
        />
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Enter an email..."
        />
        <label>Password</label>
        <input
          type="text"
          name="password"
          value={userData.password}
          onChange={handleChange}
          placeholder="Enter a password..."
        />

        {/* Add a dropdown for the role */}
        <label>Role</label>
        <select name="role" value={userData.role} onChange={handleChange}>
          <option value="tutor">Tutor</option>
          <option value="learner">Learner</option>
        </select>

        <label>Age</label>
        <input type="number" name="age" placeholder="Enter your age..." />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
