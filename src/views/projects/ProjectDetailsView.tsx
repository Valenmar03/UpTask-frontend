import { Link } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default function ProjectDetailsView() {
   return (
      <>
         <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center">
               <div className="flex items-center gap-2">
                  <h1 className="text-4xl font-bold">PROYECTO</h1>
                  <Link to={`/projects/id/edit`}>
                    <PencilSquareIcon className="size-6 cursor-pointer hover:scale-125 duration-200 text-purple-500" />
                  </Link>
               </div>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Administra</span> el
                  proyecto
               </p>
            </div>

            <nav className="my-5">
               <Link
                  to="/"
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Mis Proyectos
               </Link>
            </nav>
         </div>
      </>
   );
}
