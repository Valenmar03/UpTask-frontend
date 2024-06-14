import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../api/ProjectAPI";
import Spinner from "../components/Spinner";
import DashboardItem from "../components/projects/DashboardItem";

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
            ) : data && data.length ? (
               <ul className="mt-10 divide-y-2 divide-gray-200 dark:divide-neutral-800">
                  {data.map((project) => <DashboardItem
                     key={project._id}
                     project={project}
                  />)}
               </ul>
            ) : (
               <p className="text-lg text-center py-20 ">No tienes proyectos. {' '}
                  <Link to={'/projects/create'} className=" font-bold text-purple-700 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-400">Crea uno</Link>
               </p>
            )}
         </div>
      </>
   );
}
