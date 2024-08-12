import { ChevronLeftIcon, UserPlusIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function TeamMembersHeader() {
   const navigate = useNavigate();
   const { projectId } = useParams();
   return (
      <div className="flex flex-col items-center space-y-5 md:space-y-0 md:flex-row md:justify-between">
         <div className="flex md:justify-between w-full items-center">
            <Link to={`/projects/${projectId}`}>
               <ChevronLeftIcon className="size-10 hidden md:flex text-purple-500 hover:scale-110 hover:text-purple-600 duration-150" />
            </Link>
            <div className="flex flex-col items-center md:items-start mx-auto">
               <div className="flex flex-col md:flex-row items-center gap-2 mx-auto">
                  <h1 className="text-3xl md:text-4xl font-bold text-center">
                     Administrar Colaboradores
                  </h1>
               </div>
            </div>
         </div>

         <button
            className="text-white bg-purple-500 py-2 px-8 md:p-2 rounded-full hover:bg-purple-600 duration-200 text-xl group relative flex"
            onClick={() => navigate("?addMember=true")}
         >
            <UserPlusIcon className=" size-7 duration-200" />
            <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
               <div className="ease-in-out duration-500 -translate-y-4 pointer-events-none transition-all group-hover:-translate-y-16 absolute left-1/2 z-50 flex -translate-x-1/2 flex-col items-center rounded-sm text-center text-sm text-slate-300 before:-top-2">
                  <div className="rounded-md bg-black py-2 px-3">
                     <p className="whitespace-nowrap">Agregar Colaborador</p>
                  </div>
               </div>
            </div>
         </button>
      </div>
   );
}
