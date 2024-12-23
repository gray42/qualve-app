import { getInitials } from "../utils/helper";
import { useEffect, useState, useRef } from "react";

//TODOS: fix hover background layout

export default function Profile() {
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

  return (
    <div ref={dropdownRef} className="flex cursor-pointer items-center gap-3">
      <div
        onClick={toggleDropdown}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 font-medium text-slate-950 ring-black"
      >
        {getInitials("Gavin Traylor")}
      </div>

      {isOpen && (
        <div className="absolute right-0 top-[65px] rounded-lg bg-slate-100">
          <ul className="my-2 ml-2 mr-8">
            <li className="cursor-pointer rounded-full px-2 py-2 text-black hover:bg-slate-200">
              Profile
            </li>
            <li className="cursor-pointer rounded-full px-2 py-2 pr-4 text-black hover:bg-slate-200">
              Your Questions
            </li>
            <li className="cursor-pointer rounded-full px-2 py-2 text-black hover:bg-slate-200">
              Notifications
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
