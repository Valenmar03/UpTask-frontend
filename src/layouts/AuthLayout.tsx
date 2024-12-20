import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import LogoDark from "../components/LogoDark";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {

   const [theme, setTheme] = useState(() => {
      const themeLS = localStorage.getItem("theme");
      if (themeLS) {
         return themeLS;
      }
      if (window.matchMedia("(prefers-color-scheme:dark").matches) {
         return "dark";
      }
      return "light";
   });

   useEffect(() => {
      if (theme === "dark") {
         document.querySelector("html")?.classList.add("dark");
      } else {
         document.querySelector("html")?.classList.remove("dark");
      }
   }, [theme]);

   const handleChangeTheme = () => {
      if (theme === "light") {
         setTheme("dark");
         localStorage.setItem("theme", "dark");
         return;
      }
      setTheme("light");
      localStorage.setItem("theme", "light");
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
               </div>
            </div>
         </header>
         <section className="max-w-screen-sm mx-auto mt-10 p-5">
            <div className="shadow-xl rounded-md bg-white dark:bg-[#303030] dark:shadow-neutral-900 p-10">
               <div className=" w-64 mx-auto">
                  {theme === "light" ? <LogoDark /> : <Logo />}
               </div>
               <Outlet />
            </div>
         </section>

         <footer className="py-5 mx-auto">
            <p className="text-center">
               Valentin Martinez {new Date().getFullYear()}
            </p>
         </footer>

         <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} />
      </>
   );
}
