import Profile from "./Profile";
import Searchbar from "./Searchbar";

export default function Navbar() {
  return (
    <>
      <nav className="relative flex items-center justify-between bg-white px-4 py-2 drop-shadow-md">
        <h1 className="font-lato text-2xl text-black">Qualve</h1>
        <Searchbar />
        <Profile />
      </nav>
    </>
  );
}
