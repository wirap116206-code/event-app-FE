import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useAtuhStore } from "../store/auth.store";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useAtuhStore();

  return (
    <nav className="backdrop-blur-md sticky top-0 z-50 flex items-center justify-between w-full px-4 md:px-16 lg:px-24 xl:px-32 py-4">
      {/* LOGO */}
      <Link to="/" aria-label="FreeEvent Home">
        <div className="flex justify-between items-center">
          <img
            src="/images/logo.png"
            alt="FreeEvent Logo"
            className="h-10 w-auto object-contain"
          />
          <h1 className="flex items-center justify-center text-xl">
            <span className="text-indigo-700 font-semibold">Free</span> Event
          </h1>
        </div>
      </Link>

      {/* MENU LINKS */}
      <div
        className={`max-md:absolute max-md:bg-white max-md:h-screen max-md:overflow-hidden max-md:transition-all max-md:duration-300 max-md:top-0 max-md:left-0 max-md:flex-col max-md:justify-center max-md:text-lg max-md:backdrop-blur-md flex items-center gap-8 font-medium ${
          menuOpen
            ? "max-md:w-full max-md:visible"
            : "max-md:w-0 max-md:invisible"
        }`}
      >
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="hover:text-indigo-600 transition"
        >
          Home
        </Link>

        <Link
          to="/events"
          onClick={() => setMenuOpen(false)}
          className="hover:text-indigo-600 transition"
        >
          Events
        </Link>

        {/* AUTH BUTTON MOBILE */}
        <Link
          to={token ? "/dashboard" : "/login"}
          onClick={() => setMenuOpen(false)}
          className="md:hidden px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition active:scale-95"
        >
          {token ? "Dashboard" : "Login"}
        </Link>

        {/* CLOSE MENU */}
        <button
          type="button"
          aria-label="Close menu"
          className="absolute top-6 right-6 size-6 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <X size={24} />
        </button>
      </div>

      {/* AUTH BUTTON DESKTOP */}
      <div className="hidden md:flex items-center gap-3">
        <Link
          to={token ? "/dashboard" : "/login"}
          className="px-6 py-2 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition active:scale-95"
        >
          {token ? "Dashboard" : "Login"}
        </Link>
      </div>

      {/* BURGER MENU */}
      <button
        type="button"
        aria-label="Open menu"
        className="size-6 md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default Navbar;
