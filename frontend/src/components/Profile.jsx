import { getInitials } from "../utils/helper";
import { useEffect, useState, useRef } from "react";

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
        <div className="absolute right-0 top-[65px] mr-2 rounded-lg bg-slate-100">
          <ul className="py-1 pl-4 pr-16">
            <li className="cursor-pointer py-2 text-black">Profile</li>
            <li className="cursor-pointer py-2 text-black">Your Questions</li>
            <li className="cursor-pointer py-2 text-black">Notifications</li>
          </ul>
        </div>
      )}
    </div>
  );
}
