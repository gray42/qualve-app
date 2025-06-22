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
      name: "Your Questions",
      to: `/user/${user?._id}/questions`,
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
    <aside className="sticky flex h-[calc(100vh-1.5rem)] w-48 flex-col px-4 py-6 text-sm font-medium text-gray-700">
      {/* Brand/Logo */}
      <Link
        to="/"
        className="mb-10 text-xl font-extrabold text-gray-900 hover:text-gray-700"
      >
        MyStack
      </Link>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        {navLinks.map(({ name, to }) => (
          <Link
            key={name}
            to={to}
            className={`block rounded px-2 py-1 transition-colors ${
              isActive(to)
                ? "bg-gray-100 font-semibold text-gray-900"
                : "hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            {name}
          </Link>
        ))}
      </nav>

      {/* Spacer pushes button to bottom */}
      <div className="flex-grow" />

      {/* Call-to-action button */}
      <Link
        to="/post"
        className="mt-8 rounded bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        Ask Question
      </Link>
    </aside>
  );
}
