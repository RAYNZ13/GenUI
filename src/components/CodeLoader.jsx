import React from "react";
import { FaCode } from "react-icons/fa";

function CodeLoader() {
  return (
    <div className="skeleton w-full  h-full flex items-center flex-col justify-center">
      <div className="circle p-[20px] w-[70px] h-[70px] rounded-full bg-gradient-to-r from-[#b870ff] to-[#6d28d9] animate-pulse flex items-center text-4xl justify-center text-white">
        <FaCode />
      </div>
      <p className="text-zinc-800 italic dark:text-zinc-400 mt-4 text-center px-4">
        Your generated component will appear here...
      </p>
    </div>
  );
}

export default CodeLoader;
