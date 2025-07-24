import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
              Qualve
            </h1>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                className="text-md rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-medium text-white transition-all duration-200 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg"
                onClick={() => {
                  const section = document.getElementById("qualve");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                What is Qualve?
              </button>
              <Link to="/login">
                <button className="text-md cursor-pointer rounded-md px-3 py-2 font-medium text-gray-700 transition-colors duration-200 ease-in-out hover:text-blue-600">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button className="text-md cursor-pointer rounded-md px-3 py-2 font-medium text-gray-700 transition-colors duration-200 ease-in-out hover:text-blue-600">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
