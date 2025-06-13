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
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

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
  if (!user) return null;
  return (
    <div
      ref={dropdownRef}
      className="relative z-50 flex cursor-pointer items-center gap-3"
    >
      <div
        onClick={toggleDropdown}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-medium text-slate-950 ring-black"
      >
        {getInitials("gav tra")}
      </div>

      {isOpen && (
        <div className="absolute right-0 top-[65px] z-[9999] rounded-lg bg-slate-100 shadow-lg">
          <ul className="my-2 ml-2 mr-8">
            <li className="rounded-full px-2 py-2 hover:bg-slate-200">
              <Link to={`/profile/${user?._id}`} className="block text-black">
                My Profile
              </Link>
            </li>
            <li className="cursor-pointer rounded-full px-2 py-2 pr-4 text-black hover:bg-slate-200">
              Your Questions
            </li>
            <li className="cursor-pointer rounded-full px-2 py-2 text-black hover:bg-slate-200">
              Notifications
            </li>
            <Logout />
          </ul>
        </div>
      )}
    </div>
  );
}
