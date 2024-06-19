import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import Logo from "../components/Logo";
import NavbarMenu from "../components/NavbarMenu";

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
         <header className="bg-neutral-800 py-5 border-b border-b-neutral-700 px-3">
            <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
               <div className="w-32">
                  <Link to={"/"} className="cursor-pointer">
                     <Logo />
                  </Link>
               </div>

               <div className="flex justify-end gap-7 items-center">
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
                  <NavbarMenu />
               </div>
            </div>
         </header>
         <section className="max-w-screen-lg mx-auto mt-10 p-5">
            <Outlet />
         </section>

         <footer className="py-5 mx-auto">
            <p className="text-center">
               Valentin Martinez {new Date().getFullYear()}
            </p>
         </footer>

         <ToastContainer 
            pauseOnFocusLoss={false}
            pauseOnHover={false}
         />
      </>
   );
}
