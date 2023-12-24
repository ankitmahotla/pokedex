import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { FaArrowUp } from "react-icons/fa";

export default function App() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    // Adjust the value (e.g., 100) based on your layout and when you want the button to appear
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      {showScrollButton && (
        <button
          className="fixed bottom-10 right-8 z-10 bg-blue-400 rounded-full p-3"
          onClick={handleScrollToTop}
        >
          <FaArrowUp size={30} className="text-white" />
        </button>
      )}
      <Home />
    </div>
  );
}
