import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate, Outlet } from "react-router-dom";
import { SunIcon, MoonIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import NavbarMenu from "../components/NavbarMenu";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";

export default function AppLayout() {
   const { data, isLoading } = useAuth();

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
   if (isLoading) return <Spinner></Spinner>;
   if (!data) return <Navigate to="/auth/login" />;
   if(data) return (
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
                  <NavbarMenu user={data}/>
               </div>
            </div>
         </header>
         <section className="max-w-screen-xl mx-auto mt-10 p-5">
            <Outlet />
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
