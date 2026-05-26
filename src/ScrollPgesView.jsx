import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = {};

export default function ScrollManager() {
  const location = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    const path = location.pathname;

    if (navType === "POP") {
      const savedPosition = scrollPositions[path] || 0;
      window.scrollTo(0, savedPosition);
    } else {
      window.scrollTo(0, 0);
    }

    return () => {
      scrollPositions[path] = window.scrollY;
    };
  }, [location, navType]);

  return null;
}
