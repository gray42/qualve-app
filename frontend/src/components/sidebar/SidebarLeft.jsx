import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  TagIcon,
  UserGroupIcon,
  BookmarkIcon,
  BellIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../../context/UserContext";

export default function SidebarLeft() {
  const { user } = useUser();
  const location = useLocation();

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", to: "/", icon: <HomeIcon className="h-5 w-5" /> },
    {
      name: "Questions",
      to: "/questions",
      icon: <QuestionMarkCircleIcon className="h-5 w-5" />,
    },
    { name: "Tags", to: "/tags", icon: <TagIcon className="h-5 w-5" /> },
    {
      name: "Users",
      to: "/users",
      icon: <UserGroupIcon className="h-5 w-5" />,
    },
    {
      name: "Bookmarks",
      to: "/bookmarks",
      icon: <BookmarkIcon className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      to: "/notifications",
      icon: <BellIcon className="h-5 w-5" />,
    },
    {
      name: "Profile",
      to: `/profile/${user?._id}`,
      icon: <UserCircleIcon className="h-5 w-5" />,
    },
  ];
  return (
    <div className="min-h-screen w-1/4 bg-gray-100 p-4">
      <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-gray-200 bg-white md:flex">
        <div className="flex flex-grow flex-col p-4">
          {/* Logo or brand */}
          <Link
            to="/"
            className="mb-8 text-2xl font-bold text-blue-600 hover:text-blue-800"
          >
            MyStack
          </Link>

          {/* Navigation */}
          <nav className="flex flex-grow flex-col space-y-2">
            {navLinks.map(({ name, to, icon }) => (
              <Link
                key={name}
                to={to}
                className={`flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(to)
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <span className="mr-3 text-gray-500">{icon}</span>
                {name}
              </Link>
            ))}
          </nav>

          {/* Ask Question button */}
          <div className="mt-auto">
            <Link
              to="/post"
              className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              <PencilIcon className="mr-2 h-5 w-5" />
              Ask Question
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
