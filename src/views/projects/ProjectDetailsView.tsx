import { Link } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import { PencilSquareIcon, ChevronLeftIcon } from "@heroicons/react/20/solid";

import Spinner from "../../components/Spinner";

export default function ProjectDetailsView() {
   const params = useParams();
   const projectId = params.projectId!;

   const { data, isLoading, isError } = useQuery({
      queryKey: ["editProject", projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
   });

   if (isLoading) return <Spinner></Spinner>;
   if (isError) return <Navigate to={"/404"} />;
   if (data)
      return (
         <>
            <div className="flex flex-col items-center md:flex-row">
               <Link to="/">
                  <ChevronLeftIcon className="size-10 text-purple-500 hover:scale-110 hover:text-purple-600 duration-150" />
               </Link>
               <div className="flex flex-col items-center md:items-start mx-auto">
                  <div className="flex items-center gap-2">
                     <h1 className="text-4xl font-bold">{data.projectName}</h1>
                     <Link to={`/projects/${data._id}/edit`}>
                        <PencilSquareIcon className="size-6 cursor-pointer hover:scale-125 duration-200 text-purple-500" />
                     </Link>
                  </div>
                  <p className="text-lg text-gray-800 dark:text-gray-300 md:ml-24">
                     Proyecto de{" "}
                     <span className="text-purple-500">{data.clientName}</span>
                  </p>
               </div>
               <button
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Agregar Tarea
               </button>
            </div>
         </>
      );
}
