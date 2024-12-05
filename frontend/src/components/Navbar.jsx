import Profile from "./Profile";
import Searchbar from "./Searchbar";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between bg-white px-4 py-2 drop-shadow-md">
        <h1 className="font-roboto text-xl text-black">Qualve</h1>
        {/* navbar component */}
        {/* searchbar component component */}
        <Searchbar />
        {/* profile component */}
        <Profile />
      </div>
    </>
  );
}
