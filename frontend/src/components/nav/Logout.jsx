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
      className="cursor-pointer rounded-full px-2 py-2 text-black hover:bg-slate-200"
    >
      Logout
    </li>
  );
}
