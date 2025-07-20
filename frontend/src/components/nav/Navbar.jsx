import { Link } from "react-router-dom";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import Button from "@mui/material/Button";
import { useUser } from "../../context/UserContext";
import { useNotifications } from "../../context/NotificationContext";

export default function Navbar() {
  const { user } = useUser();
  const { unreadCount } = useNotifications();

  return (
    <nav className="flex w-full flex-wrap items-center justify-between gap-4 px-6 py-3">
      <Link to="/">
        <h1 className="font-lato text-2xl text-black">Qualve</h1>
      </Link>

      <div className="ml-auto flex items-center space-x-4">
        {!user && (
          <>
            <Link to="/login">
              <Button variant="contained" color="black">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="contained" color="black">
                Sign Up
              </Button>
            </Link>
          </>
        )}

        <div className="flex max-w-4xl flex-1 justify-center">
          <Searchbar />
        </div>

        <Link to="/notifications">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadCount > 10 ? "10+" : unreadCount}
              </span>
            )}
          </div>
        </Link>

        {user && <Profile />}
      </div>
    </nav>
  );
}
