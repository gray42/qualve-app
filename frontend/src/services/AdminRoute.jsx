import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function AdminRoute() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
