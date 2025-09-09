import React from "react";
import { DotLoader } from "react-spinners";
import {
  Copy,
  Export,
  NewTab,
  Refresh,
  CodeLoader,
  CodeEditor,
} from "../index";
import { openNewWindow } from "../NewWindow";
import { toast } from "react-toastify";

const RightPanel = ({
  code,
  outputScreen,
  codeSpace,
  setCodeSpace,
  loading,
}) => {
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const downloadFile = async () => {
    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "GetCode.html";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full md:w-1/2 h-[80vh] sm:h-[90vh] bg-amber-50 border-1 shadow-2xl dark:bg-[#141319] rounded-lg flex flex-col relative">
      {/* Loader overlay only when generating */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.5)] z-10 rounded-lg">
          <DotLoader />
        </div>
      )}

      {outputScreen ? (
        <>
          {/* Tabs */}
          <div className="flex items-center gap-2 text-zinc-400 p-4 border-b border-[#3f3f46]">
            <button
              onClick={() => setCodeSpace(1)}
              className={`w-1/2 p-3 rounded-xl relative overflow-hidden transition-colors duration-300 ${
                codeSpace === 1
                  ? "text-white font-semibold"
                  : "text-zinc-800 dark:text-zinc-200 font-normal"
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#b870ff] to-[#6d28d9] transition-opacity duration-500 rounded-xl ${
                  codeSpace === 1 ? "opacity-100" : "opacity-0"
                }`}
              ></span>
              <span className="relative z-10">Code</span>
            </button>

            <button
              onClick={() => setCodeSpace(2)}
              className={`w-1/2 p-3 rounded-xl relative overflow-hidden transition-colors duration-300 ${
                codeSpace === 2
                  ? "text-white font-semibold"
                  : "text-zinc-800 dark:text-zinc-200 font-normal"
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#b870ff] to-[#6d28d9] transition-opacity duration-500 rounded-xl ${
                  codeSpace === 2 ? "opacity-100" : "opacity-0"
                }`}
              ></span>
              <span className="relative z-10">Preview</span>
            </button>
          </div>

          {/* Editor / Preview */}
          <div className="flex-1 min-h-0 p-4 overflow-auto">
            {codeSpace === 1 ? (
              <CodeEditor value={code} onChange={() => {}} className="h-full" />
            ) : (
              <iframe srcDoc={code} className="w-full h-full bg-amber-50" />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-4">
            {codeSpace === 1 ? (
              <>
                <Copy onClick={copyCode} disabled={!code} />
                <Export onClick={downloadFile} disabled={!code} />
              </>
            ) : (
              <>
                <NewTab onClick={() => openNewWindow(code)} />
                <Refresh
                  onClick={() => {
                    setCodeSpace(0);
                    setTimeout(() => setCodeSpace(2), 50);
                    toast.success("Page Refreshed");
                  }}
                />
              </>
            )}
          </div>
        </>
      ) : (
        !loading && <CodeLoader /> // Placeholder only when not loading
      )}
    </div>
  );
};

export default RightPanel;
