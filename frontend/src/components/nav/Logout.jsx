import { useNavigate } from "react-router-dom";
import { logUserOut } from "../../services/api";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logUserOut();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out user:", error);
      throw error;
    }
  };

  return (
    <li
      onClick={handleLogout}
      className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
    >
      Logout
    </li>
  );
}
