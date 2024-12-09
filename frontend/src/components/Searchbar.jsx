import { FaSearch } from "react-icons/fa";

export default function Searchbar() {
  return (
    <div className="relative ml-auto mr-4 flex items-center rounded-full bg-slate-100 px-4 py-2">
      <input
        type="text"
        placeholder="Search"
        className="text-md w-full bg-transparent outline-none"
      />

      <FaSearch />
    </div>
  );
}
