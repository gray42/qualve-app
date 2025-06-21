import { Link } from "react-router-dom";
import Profile from "./Profile";
import Searchbar from "./Searchbar";
import Button from "@mui/material/Button";
import { useUser } from "../../context/UserContext";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav className="flex items-center justify-between px-6 py-3">
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

        <Searchbar />
        {user && <Profile />}
      </div>
    </nav>
  );
}
