// src/components/TopLoader.tsx
import LoadingBar from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const TopLoader = () => {
  const ref = useRef<any>(null);
  const location = useLocation();

  useEffect(() => {
    ref.current?.continuousStart();
    ref.current?.complete();
  }, [location]);

  return <LoadingBar className="text-secondary" ref={ref} height={3} shadow />;
};

export default TopLoader;
