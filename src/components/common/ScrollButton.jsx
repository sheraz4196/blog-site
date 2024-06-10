import React, { useState, useEffect, useCallback } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = useCallback(() => {
    setShowScroll(window.pageYOffset > 100);
  }, []);

  useEffect(() => {
    const handleScroll = debounce(checkScrollTop, 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [checkScrollTop]);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div
      className="fixed z-50 right-3 md:right-5 bottom-5 rounded-full p-2 bg-black dark:bg-white shadow-md shadow-black/55 dark:shadow-sm dark:shadow-white/25 cursor-pointer"
      onClick={scrollTop}
      style={{ display: showScroll ? "block" : "none" }}
    >
      <MdOutlineKeyboardArrowUp className="text-3xl  text-white dark:text-black" />
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default ScrollToTop;
