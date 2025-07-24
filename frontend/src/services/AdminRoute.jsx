import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";

export default function AdminRoute() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    toast.error("Unauthenticated user");
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
