import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Footer } from "./components/index";
import Home from "./components/Home/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
