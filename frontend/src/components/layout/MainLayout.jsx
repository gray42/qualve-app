import SidebarLeft from "../sidebar/SidebarLeft";
import SidebarRight from "../sidebar/SidebarRight";
import Navbar from "../nav/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar: full height */}
      <aside className="fixed left-0 top-0 h-screen w-48 border-r border-gray-200 bg-white">
        <SidebarLeft />
      </aside>

      {/* Right section: navbar on top, content and right sidebar below */}
      <div className="ml-48 flex flex-1 flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-30 border-b border-gray-200 bg-white drop-shadow-md">
          <Navbar />
        </header>

        {/* Body: main content + right sidebar */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main content area */}
          <main className="flex-1 overflow-auto p-6">
            <Outlet />
          </main>

          {/* Right sidebar */}
          <aside className="hidden w-40 overflow-auto border-l border-gray-200 bg-white xl:block">
            <SidebarRight />
          </aside>
        </div>
      </div>
    </div>
  );
}
