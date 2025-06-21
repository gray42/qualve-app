import SidebarLeft from "../sidebar/SidebarLeft";
import SidebarRight from "../sidebar/SidebarRight";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-50 pt-3">
      <div className="flex w-full">
        {/* Left Sidebar */}
        <div className="hidden w-1/4 lg:block">
          <div className="h-full rounded-lg bg-white shadow">
            <SidebarLeft />
          </div>
        </div>

        {/* Middle content (posts, profile, etc.) */}
        <main className="w-full py-6 lg:w-1/2">
          <Outlet />
        </main>

        {/* Right Sidebar */}
        <div className="hidden w-1/4 xl:block">
          <div className="h-full rounded-lg bg-white shadow">
            <SidebarRight />
          </div>
        </div>
      </div>
    </div>
  );
}
