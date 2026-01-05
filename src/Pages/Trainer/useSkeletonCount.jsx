import { useEffect, useRef, useState } from "react";

const useSkeletonCount = () => {
  const gridRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!gridRef.current) return;

    const calculate = () => {
      const grid = gridRef.current;
      const width = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let columns = 1;
      if (width >= 1024) columns = 3;
      else if (width >= 640) columns = 2;

      /* ---------- HEIGHT CALCULATION ---------- */
      const HEADER_OFFSET = 160; 
      const CARD_HEIGHT = 170;   
      const GAP = 24;

      const usableHeight = viewportHeight - HEADER_OFFSET;
      const rows = Math.max(
        1,
        Math.ceil(usableHeight / (CARD_HEIGHT + GAP))
      );

      setCount(columns * rows);
    };

    calculate();

    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, []);

  return { gridRef, count };
};

export default useSkeletonCount;
