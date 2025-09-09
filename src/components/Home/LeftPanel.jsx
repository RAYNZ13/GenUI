import React from "react";
import Select from "react-select";
import { BsStars } from "react-icons/bs";
import { toast } from "react-toastify";

const options = [
  // Basic
  { label: "HTML", value: "html" },

  // Styling frameworks
  { label: "HTML + CSS", value: "html-css" },
  { label: "HTML + Tailwind", value: "html-tailwind" },
  { label: "HTML + Bootstrap", value: "html-bootstrap" },

  // With JavaScript
  { label: "HTML + CSS + JS", value: "html-css-js" },
  { label: "HTML + Tailwind + JS", value: "html-tailwind-js" },
  { label: "HTML + Bootstrap + JS", value: "html-bootstrap-js" },

  // With GSAP (animations)
  { label: "HTML + CSS + GSAP", value: "html-css-gsap" },
  { label: "HTML + Tailwind + GSAP", value: "html-tailwind-gsap" },
  { label: "HTML + Bootstrap + GSAP", value: "html-bootstrap-gsap" },

  // With JS + GSAP
  { label: "HTML + CSS + JS + GSAP", value: "html-css-js-gsap" },
  { label: "HTML + Tailwind + JS + GSAP", value: "html-tailwind-js-gsap" },
  { label: "HTML + Bootstrap + JS + GSAP", value: "html-bootstrap-js-gsap" },
];

const LeftPanel = ({
  prompt,
  setPrompt,
  framework,
  setFramework,
  getResponse,
  loading,
  error,
  placeholders,
  placeholderIndex,
  setCode,
  setOutputScreen,
}) => {
  const handleGenerate = async () => {
    // Clear previous output
    setCode("");
    setOutputScreen(false);
    // Call the AI generation
    await getResponse({ prompt, framework, setCode, setOutputScreen });
  };

  return (
    <div className="w-full md:w-1/2 min-h-[60vh] sm:min-h-[80vh] bg-amber-50 border-1 shadow-2xl dark:bg-[#141319] rounded-lg p-6 md:p-10 flex flex-col">
      <h1 className="text-3xl font-semibold sp-text">AI Component Generator</h1>
      <p className="text-sm text-zinc-800 dark:text-zinc-300 mt-2 italic">
        Describe your Component and let AI generate the code...
      </p>

      <p className="mt-6 text-[#632d98]  darK:text-[#c084fc] font-semibold">
        Select your Framework
      </p>
      <Select
        options={options}
        value={framework}
        onChange={setFramework}
        className="mt-2 outline-1 rounded-sm"
        classNamePrefix="custom-select"
        // ...styles remain unchanged
      />

      <p className="mt-6 text-[#632d98]  darK:text-[#c084fc] font-semibold">
        Describe your Component
      </p>
      <textarea
        className="w-full min-h-[256px] mt-2 p-2  bg-amber-50darK:bg-[#18181b] border border-[#3f3f46] rounded-md text-zinc-800 dark:text-zinc-100"
        placeholder={placeholders[placeholderIndex]}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button
        onClick={handleGenerate} // use new handler
        disabled={loading}
        className={`mt-4 w-full py-2 rounded-md text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r from-[#b870ff] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#b573f8] ${
          loading ? "opacity-60 cursor-not-allowed" : ""
        }`}
      >
        <BsStars />
        {loading ? "Generating..." : "Generate"}
      </button>

      {error && (
        <div className="mt-3 text-red-500">
          <p>{error}</p>
          <button
            onClick={handleGenerate} // use same handler for retry
            className="mt-2 px-3 py-1 bg-[#6d28d9] text-white rounded"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
