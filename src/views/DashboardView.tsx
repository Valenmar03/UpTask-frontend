import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../api/ProjectAPI";
import Spinner from "../components/Spinner";

export default function DashboardView() {
   const { data, isLoading } = useQuery({
      queryKey: ["projects"],
      queryFn: getAllProjects,
   });

   return (
      <>
         <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center">
               <h1 className="text-4xl font-bold">Mis Proyectos</h1>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Administra</span> tus
                  proyectos
               </p>
            </div>

            <nav className="my-5">
               <Link
                  to="/projects/create"
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Nuevo Projecto
               </Link>
            </nav>
         </div>
         <div>
            {isLoading ? (
               <Spinner></Spinner>
            ) : (
               data && data.map((project) => 
                  <p>{project.description}</p>
               )
            )}
         </div>
      </>
   );
}
