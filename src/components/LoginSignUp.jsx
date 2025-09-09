import React, { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // Log in
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up
        await createUserWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full min-h-screen flex items-center justify-center bg-amber-50 dark:bg-[#141319] p-4">
      <div className="max-w-md w-full border-1 bg-white dark:bg-[#1c1b23] rounded-2xl shadow-2xl p-8 space-y-6 transition-all">
        <h2 className="text-3xl font-bold text-center text-[#6d28d9] dark:text-[#c084fc]">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-zinc-700 dark:text-zinc-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-amber-50 dark:bg-[#141319] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] transition"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-zinc-700 dark:text-zinc-300 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-amber-50 dark:bg-[#141319] text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-[#6d28d9] transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#b870ff] to-[#6d28d9] text-white font-semibold hover:from-[#6d28d9] hover:to-[#b870ff] transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="text-[#6d28d9] dark:text-[#c084fc] font-semibold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
