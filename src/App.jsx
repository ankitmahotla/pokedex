import React from "react";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { FaArrowUp } from "react-icons/fa";

export default function App() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <Navbar />
      <button
        className="fixed bottom-10 right-8 z-10 bg-blue-400 rounded-full p-3"
        onClick={handleScrollToTop}
      >
        <FaArrowUp size={30} className="text-white" />
      </button>
      <Home />
    </div>
  );
}
