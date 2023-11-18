"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

export const DarkMode = () => {
  const { themes, resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) null;

  if (isMounted)
    return (
      <div className="hover:hover:ring-1 ring-[#64646a] rounded-[0.3rem] text-2xl flex  items-center p-[0.3rem] hover:bg-c_Graywhite hover:dark:bg-c_Litegrey duration-300">
        <button onClick={() => setTheme(resolvedTheme == "dark" ? "light" : "dark")}>
          {resolvedTheme == "dark" ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </button>
      </div>
    );
};
