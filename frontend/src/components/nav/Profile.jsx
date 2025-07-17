import { getInitials } from "../../utils/helper";
import { useEffect, useState, useRef, useContext } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";
//TODOS: fix hover background layout

export default function Profile() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeDropdown();
      buttonRef.current?.focus();
    }
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleDropdown();
    }
  };

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus first menu item when dropdown opens
      const firstMenuItem =
        dropdownRef.current?.querySelector('[role="menuitem"]');
      firstMenuItem?.focus();
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <div
      ref={dropdownRef}
      className="relative z-50 flex cursor-pointer items-center gap-3"
    >
      {/* Avatar Button */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`User menu for ${user.name}`}
      >
        {getInitials(user.name)}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="animate-in fade-in-0 zoom-in-95 absolute right-0 top-14 z-[9999] min-w-[200px] rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 duration-100">
          {/* User Info Header */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              to={`/profile/${user?._id}`}
              className="group flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
              role="menuitem"
              onClick={closeDropdown}
              tabIndex={0}
            >
              <svg
                className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              My Profile
            </Link>

            <Link
              to={`/user/${user?._id}/questions`}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
              role="menuitem"
              onClick={closeDropdown}
              tabIndex={0}
            >
              <svg
                className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Your Questions
            </Link>

            <Link
              to={"/notifications"}
              className="group flex w-full items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900"
              role="menuitem"
              onClick={closeDropdown}
              tabIndex={0}
            >
              <svg
                className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-5 5v-5zM4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Notifications
              {/* Optional: Add notification badge */}
              <span className="ml-auto inline-flex items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-red-100">
                3
              </span>
            </Link>

            <div className="my-1 border-t border-gray-100"></div>

            <Logout onLogout={closeDropdown} />
          </div>
        </div>
      )}
    </div>
  );
}
