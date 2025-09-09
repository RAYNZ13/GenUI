import React, { useState, useEffect } from "react";
import { LoginSignUp, NavBar } from "../index";
import { useGenAI } from "../../backend/genAiapi";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const Home = () => {
  const { user } = useAuth();

  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(null);
  const [code, setCode] = useState("");
  const [outputScreen, setOutputScreen] = useState(false);
  const [codeSpace, setCodeSpace] = useState(1);

  const placeholders = [
    "Describe your component...",
    "e.g. A responsive navbar with a logo and icons",
    "e.g. A dark mode toggle button",
    "e.g. A pricing card with gradient background",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { getResponse, loading, error } = useGenAI();

  // ✅ Toast when user logs in
  useEffect(() => {
    if (user) {
      toast.success(`Welcome back, ${user.email || "User"}!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [user]);

  return (
    <>
      <NavBar />
      {!user ? (
        <LoginSignUp />
      ) : (
        <div className="flex flex-col md:flex-row gap-8 px-4 sm:px-16 md:px-24 mt-10 sm:mt-5">
          <LeftPanel
            prompt={prompt}
            setPrompt={setPrompt}
            framework={framework}
            setFramework={setFramework}
            getResponse={getResponse}
            loading={loading}
            error={error}
            placeholders={placeholders}
            placeholderIndex={placeholderIndex}
            setCode={setCode}
            setOutputScreen={setOutputScreen}
          />
          <RightPanel
            code={code}
            outputScreen={outputScreen}
            codeSpace={codeSpace}
            setCodeSpace={setCodeSpace}
          />
        </div>
      )}
    </>
  );
};

export default Home;
