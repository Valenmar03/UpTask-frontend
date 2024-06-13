import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";

import Logo from "../components/Logo";

export default function AppLayout() {
    const [theme, setTheme] = useState(() => {
        if (window.matchMedia("(prefers-color-scheme:dark").matches) {
           return "dark";
        }
        document.querySelector("html")?.classList.add("pretty-bg");
        return "light";
     });
  
  
     useEffect(() => {
        if (theme === "dark") {
           document.querySelector("html")?.classList.add("dark");
           document.querySelector("html")?.classList.remove("pretty-bg");
        } else {
           document.querySelector("html")?.classList.remove("dark");
           document.querySelector("html")?.classList.add("pretty-bg");
        }
     }, [theme]);
  
     const handleChangeTheme = () => {
        theme === "light" ? setTheme("dark") : setTheme("light");
     };

   return (
      <>
            <header className="bg-zinc-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Logo/>
                    </div>

                    <nav>

                    {theme === "dark" ? (
                     <SunIcon
                        className="text-sky-600 size-9 hover:scale-110 p-1 duration-300 cursor-pointer"
                        onClick={handleChangeTheme}
                     />
                  ) : (
                     <MoonIcon
                        className="text-sky-600 size-9 hover:scale-110 p-1 duration-300 cursor-pointer"
                        onClick={handleChangeTheme}
                     />
                  )}
                    </nav>
                </div>
            </header>
         <Outlet />
      </>
   );
}
