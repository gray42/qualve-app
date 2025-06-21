import { Outlet } from "react-router-dom";

export default function SimpleLayout() {
  return (
    <div className="min-h-screen p-4">
      <Outlet />
    </div>
  );
}
