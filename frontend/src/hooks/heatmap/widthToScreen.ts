import { useEffect, useState } from "react";

const getMonthsToShow = (width: number) => {
  if (width >= 2560) return 18;
  if (width >= 2200) return 15;
  if (width >= 1600) return 13;
  return 12;
};

export const useMonthsToShow = () => {

  const [monthsToShow, setMonthsToShow] = useState<number>(() =>
    typeof window === "undefined" ? 12 : getMonthsToShow(window.innerWidth)
  );

  useEffect(()=> {
    const handleResize = () => {
      setMonthsToShow(getMonthsToShow(window.innerWidth));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return monthsToShow;

};
