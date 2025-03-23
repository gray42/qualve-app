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
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  };

  return (
    <>
      <h1>Log In</h1>

      <form onSubmit={loginUser}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter an email..."
          value={userData.email}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter a password..."
          value={userData.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        Don&apos;t have an account? <a href="/signup">Sign up</a>
      </p>
    </>
  );
}
