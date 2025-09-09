import React from "react";

const Footer = () => {
  return (
    <footer className="bg-amber-50 dark:bg-[#141319] text-zinc-700 dark:text-zinc-300 py-6 mt-10 border-t border-zinc-300 dark:border-zinc-700">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo / Brand */}
        <h3 className="text-lg font-semibold tracking-tight">
          GetCode<span className="text-[#6d28d9]">.</span>
        </h3>

        {/* Links */}
        {/* <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-[#6d28d9] transition">
            About
          </a>
          <a href="#" className="hover:text-[#6d28d9] transition">
            Contact
          </a>
          <a href="#" className="hover:text-[#6d28d9] transition">
            Privacy
          </a>
        </div> */}

        {/* Copyright */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} GetCode. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
