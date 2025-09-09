import React from "react";
import { ImNewTab } from "react-icons/im";

function NewTab({ onClick }) {
  return (
    <button
      aria-label="Open in new tab"
      title="Open in new tab"
      onClick={onClick}
      className="p-2 sm:p-3 border border-zinc-800 rounded-full 
            bg-white dark:bg-[#1f1f24] dark:text-white hover:bg-zinc-800 hover:text-[#c29de7] transition cursor-pointer"
    >
      <ImNewTab />
    </button>
  );
}

export default NewTab;
