import { useState, useEffect } from "react";

function useScreenWidthMatch(width: number) {
  const [isMatch, setIsMatch] = useState(window.innerWidth >= width);

  useEffect(() => {
    const handleResize = () => {
      setIsMatch(window.innerWidth >= width);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  return isMatch;
}

export default useScreenWidthMatch;
