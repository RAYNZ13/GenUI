import React from "react";
import Editor from "@monaco-editor/react";

function CodeEditor({ value, onChange, language }) {
  return (
    <Editor
      value={value}
      onChange={onChange}
      height="100%"
      theme="vs-dark"
      defaultLanguage={language || "html"}
    />
  );
}

export default CodeEditor;
