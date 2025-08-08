import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ensures each page load/navigation starts at the very top
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Instant jump to top for consistency
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return null;
}
