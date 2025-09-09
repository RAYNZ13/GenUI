import React from "react";
import { PiExportBold } from "react-icons/pi";

function Export({ onClick, disabled }) {
  return (
    <button
      aria-label="Export code"
      onClick={onClick}
      className="p-2 sm:p-3 border border-zinc-800 rounded-full 
            bg-white dark:bg-[#1f1f24] dark:text-white hover:bg-zinc-800 hover:text-[#c29de7] transition cursor-pointer"
      disabled={disabled}
    >
      <PiExportBold />
    </button>
  );
}

export default Export;
