import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
   PencilSquareIcon,
   ChevronLeftIcon,
   PlusIcon,
} from "@heroicons/react/20/solid";
import { Project } from "../../types";

export default function ProjectDetailsHeader({ data }: { data: Project }) {
   const navigate = useNavigate();
   return (
      <div className="flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:justify-between">
         <div className="flex md:justify-between w-full items-center">
            <Link to="/">
               <ChevronLeftIcon className="size-10 hidden md:flex text-purple-500 hover:scale-110 hover:text-purple-600 duration-150" />
            </Link>
            <div className="flex flex-col items-center text-center md:items-start mx-auto">
               <div className="flex flex-col md:flex-row items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-center">
                     {data.projectName}
                  </h1>
                  <Link
                     to={`/projects/${data._id}/edit`}
                     className="relative group"
                  >
                     <PencilSquareIcon className="size-6 cursor-pointer hover:scale-125 duration-200 text-purple-500 md:ml-2" />
                     <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
                        <div className="ease-in-out duration-300 translate-x-4 pointer-events-none transition-all group-hover:translate-x-6 absolute left-1/2 z-50 flex -translate-y-full flex-col items-center rounded-sm text-center text-sm text-slate-300 before:top-[50%]">
                           <div className="rounded-md bg-black py-2 px-3">
                              <p className="whitespace-nowrap">
                                 Editar Proyecto
                              </p>
                           </div>
                        </div>
                     </div>
                  </Link>
               </div>
               <p className="text-lg text-gray-800 dark:text-gray-300 mx-auto">
                  Proyecto de{" "}
                  <span className="text-purple-500">{data.clientName}</span>
               </p>
            </div>
         </div>

         <button
            className="text-white bg-purple-500 py-2 px-8 md:p-2 rounded-full hover:bg-purple-600 duration-200 text-xl group relative flex items-center"
            onClick={() => navigate("?newTask=true")}
         >
            <PlusIcon className=" size-7 duration-200" />
            <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
               <div className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
                  <div className="rounded-md bg-black py-2 px-3">
                     <p className="whitespace-nowrap">Agregar Tarea</p>
                  </div>
               </div>
            </div>
         </button>
      </div>
   );
}
