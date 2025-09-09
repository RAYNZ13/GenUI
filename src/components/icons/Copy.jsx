import React from "react";
import { IoCopy } from "react-icons/io5";

function Copy({ onClick, disabled }) {
  return (
    <button
      aria-label="Copy Code"
      onClick={onClick}
      className="p-2 sm:p-3 border border-zinc-800 rounded-full 
            bg-white dark:bg-[#1f1f24] dark:text-white hover:bg-zinc-800 hover:text-[#c29de7] transition cursor-pointer"
      disabled={disabled}
    >
      <IoCopy />
    </button>
  );
}

export default Copy;
