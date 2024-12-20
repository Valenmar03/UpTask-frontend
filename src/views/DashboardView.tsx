import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../api/ProjectAPI";
import DashboardItem from "../components/projects/DashboardItem";
import Modal from "../components/Modal";
import CreateProject from "../components/projects/CreateProject";
import ProjectsItemsLoading from "../components/Loadings/ProjectsItemsLoading";

export default function DashboardView() {
   const [animateModal, setAnimateModal] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const modalProject = queryParams.get("newProject");
   const show = modalProject ? true : false;

   useEffect(() => {
      if (show) {
         setTimeout(() => {
            setAnimateModal(true);
         }, 100);
      }
   }, [show]);

   const closeModal = () => {
      setAnimateModal(false);
      setTimeout(() => {
         navigate("", { replace: true });
      }, 300);
   };


   const { data, isLoading } = useQuery({
      queryKey: ["projects"],
      queryFn: getAllProjects,
   })
   return (
      <>
         {show && (
            <Modal animateModal={animateModal} closeModal={closeModal}>
               <div
                  className="bg-gray-100 dark:bg-neutral-800 w-10/12 lg:w-2/5 p-5 rounded-md transition-all ease-in duration-300 mx-auto sm:my-32 "
                  onClick={(e) => e.stopPropagation()}
               >
                  <CreateProject />
               </div>
            </Modal>
         )}
         <div className={`flex flex-col items-center md:flex-row md:justify-between`}>
            <div className="flex flex-col items-center">
               <h1 className="text-4xl font-bold">Mis Proyectos</h1>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Administra</span> tus
                  proyectos
               </p>
            </div>

            <nav className="my-5">
               <button
                  onClick={() => navigate("?newProject=true")}
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Nuevo Proyecto
               </button>
            </nav>
         </div>
         <div className="w-full h-full">
            {isLoading ? (
               <ul className="mt-10 divide-y-2 divide-gray-200 dark:divide-neutral-800">
                  <ProjectsItemsLoading />
                  <ProjectsItemsLoading />
                  <ProjectsItemsLoading />
               </ul>
            ) : data && data.length ? (
               <ul className="mt-10 divide-y-2 divide-gray-200 dark:divide-neutral-800">
                  {data.map((project) => (
                     <DashboardItem key={project._id} project={project} />
                  ))}
               </ul>
            ) : (
               <p className="text-lg text-center py-20 ">
                  No tienes proyectos.{" "}
                  <button
                     onClick={() => navigate("?newProject=true")}
                     className=" font-bold text-purple-700 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-400"
                  >
                     Crea uno
                  </button>
               </p>
            )}
         </div>
      </>
   );
}
