import React from "react";
import { LuRefreshCcw } from "react-icons/lu";

function Refresh({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Refresh Code"
      className="p-2 sm:p-3 border border-zinc-800 rounded-full 
            bg-white dark:bg-[#1f1f24] dark:text-white hover:bg-zinc-800 hover:text-[#c29de7] transition cursor-pointer"
    >
      <LuRefreshCcw />
    </button>
  );
}

export default Refresh;
