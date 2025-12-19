import { useEffect, useState } from "react";

export const useFooterVisibility = (navbarHeight: number) => {
  const [isFooterTouchingNavbar, setIsFooterTouchingNavbar] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const handleScroll = () => {
      const footerRect = footer.getBoundingClientRect();
      // Footer top <= navbarHeight → touching navbar
      setIsFooterTouchingNavbar(footerRect.top <= navbarHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navbarHeight]);

  return isFooterTouchingNavbar;
};
