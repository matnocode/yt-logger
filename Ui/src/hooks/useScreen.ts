import { useEffect, useMemo, useRef, useState } from "react";

export const useScreen = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = useMemo(() => screenSize.width <= 400, [screenSize]);
  const isTablet = useMemo(() => screenSize.width <= 800, [screenSize]);
  return { isMobile, isTablet };
};
