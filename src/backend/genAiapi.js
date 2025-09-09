// src/hooks/useGenAI.js
import { useState } from "react";
import { toast } from "react-toastify";
import { GoogleGenAI } from "@google/genai";
import config from "../config";

export const useGenAI = () => {
  const ai = new GoogleGenAI({ apiKey: config.geminiAPI });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const randomBetween = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const getResponse = async ({ prompt, framework, setCode, setOutputScreen, maxRetries = 4, fallbackModel = "gemini-2.1" } = {}) => {
    if (!prompt || !framework?.value) {
      setError("Please provide a prompt and framework.");
      toast.error("Please provide a prompt and framework.");
      return;
    }

    setLoading(true);
    setError("");

    let attempt = 0;
    let lastErr = null;
    let usedModel = "gemini-2.5-flash";

    while (attempt <= maxRetries) {
      try {
        if (attempt > 1 && fallbackModel) usedModel = fallbackModel;

        const response = await ai.models.generateContent({
          model: usedModel,
          contents: `
You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components.

Generate a UI component for: ${prompt}
Framework: ${framework.value}
Return ONLY the code in a single HTML file.
          `,
        });

        let rawText =
          response?.text?.trim() ||
          (Array.isArray(response?.output)
            ? response.output.map(o => (o?.content || []).map(c => c?.text || "").join("\n")).join("\n").trim()
            : null) ||
          (Array.isArray(response?.candidates)
            ? response.candidates.map(c => c?.content || "").join("\n").trim()
            : null) ||
          JSON.stringify(response);

        const cleanCode = rawText.replace(/```[\s\S]*?```/g, m => m.replace(/```[\w]*\n?/g, "").replace(/```/g, "")).trim();

        setCode(cleanCode);
        setOutputScreen(true);
        setLoading(false);
        return { success: true, text: cleanCode, raw: rawText };

      } catch (err) {
        lastErr = err;
        attempt += 1;

        const status = err?.status || err?.error?.code || err?.response?.status || err?.statusCode;
        const message = err?.message || err?.error?.message || JSON.stringify(err);

        if (status && String(status).startsWith("4")) {
          setLoading(false);
          setError(`Request failed: ${message}`);
          console.error("GenAI client error (no retry):", err);
          return { success: false, error: err };
        }

        if (attempt <= maxRetries) {
          const wait = initialDelayMs * Math.pow(2, attempt - 1) + randomBetween(0, 300);
          await sleep(wait);
          continue;
        }

        setLoading(false);
        setError("Service temporarily unavailable. Please try again later.");
        return { success: false, error: lastErr };
      }
    }

    setLoading(false);
    setError("Unknown error");
    return { success: false, error: lastErr };
  };

  return { getResponse, loading, error };
};
