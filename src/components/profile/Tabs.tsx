import { UserIcon, FingerPrintIcon } from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";

export default function Tabs() {
   const location = useLocation();
   const { pathname } = location;

   return (
      <nav className="border-b border-gray-400 flex gap-8 mb-10">
         <Link
            to="/profile"
            className={` flex gap-2 pb-3 px-5 border-b-2 duration-200 items-center ${
               pathname === "/profile"
                  ? "text-purple-700 border-purple-700 dark:text-purple-400 dark:border-purple-400"
                  : "hover:text-purple-400 dark:hover:text-purple-500 border-transparent"
            }  `}
         >
            <UserIcon className="size-6" />
            Mi cuenta
         </Link>
         <Link
            to="/profile/password"
            className={`flex gap-2 pb-3 px-5 border-b-2 duration-200 items-center ${
               pathname === "/profile/password"
                  ? "text-purple-700 border-purple-700 dark:text-purple-400 dark:border-purple-400"
                  : "hover:text-purple-400 dark:hover:text-purple-500 border-transparent"
            }  `}
         >
            <FingerPrintIcon className="size-6" />
            Cambiar Contraseña
         </Link>
      </nav>
   );
}
