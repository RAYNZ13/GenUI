import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";
import { IoMdMoon } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleUserClick = () => {
    if (!user) {
      toast.error("Please login first to access your profile.");
      return;
    }
    setShowDropdown(!showDropdown);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header
      className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-24 h-[70px] border-b border-zinc-800 shadow shadow-zinc-900/50 
      bg-amber-50 dark:bg-[#141319] text-black dark:text-white"
    >
      {/* Logo */}
      <div className="logo">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight sp-text">
          GetCode.
        </h3>
      </div>

      {/* Icons */}
      <nav className="flex items-center gap-2 sm:gap-3 relative">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="p-2 sm:p-3 border border-zinc-800 rounded-full 
            bg-white dark:bg-[#1f1f24] hover:bg-zinc-800 hover:text-[#c29de7] transition"
        >
          {theme === "dark" ? (
            <HiSun className="text-lg sm:text-xl text-yellow-400" />
          ) : (
            <IoMdMoon className="text-lg sm:text-xl text-[#c29de7]" />
          )}
        </button>

        {/* User */}
        <button
          aria-label="User profile"
          className="p-2 sm:p-3 border border-zinc-800 rounded-full 
          bg-white dark:bg-[#1f1f24] hover:bg-zinc-800 hover:text-[#c29de7] transition"
          onClick={handleUserClick}
        >
          <FaUserAlt className="text-lg sm:text-xl" />
        </button>

        {/* Dropdown */}
        {user && showDropdown && (
          <div className="absolute right-0 mt-40 sm:mt-45 bg-white dark:bg-[#1c1b23] border border-zinc-700 rounded-lg shadow-lg px-5 py-3 flex flex-col z-50">
            <span className="text-zinc-900 dark:text-zinc-100 font-medium px-2 py-1">
              {user?.email || "User"}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-500 border-1 px-2 py-1 mt-5 hover:bg-red-800 dark:hover:bg-red-900 hover:text-white rounded transition"
            >
              Logout
            </button>
          </div>
        )}

        {/* Settings */}
        <button
          aria-label="Settings"
          className="p-2 sm:p-3 border border-zinc-800 rounded-full 
            bg-white dark:bg-[#1f1f24] hover:bg-zinc-800 hover:text-[#c29de7] transition"
        >
          <RiSettings3Fill className="text-lg sm:text-xl" />
        </button>
      </nav>
    </header>
  );
};

export default NavBar;
