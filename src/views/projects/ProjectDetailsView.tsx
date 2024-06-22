import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import {
   PencilSquareIcon,
   ChevronLeftIcon,
   PlusIcon,
   XMarkIcon
} from "@heroicons/react/20/solid";

import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import AddTask from "../../components/tasks/AddTask";

export default function ProjectDetailsView() {

   const [modal, setModal] = useState(false);
   const [animateModal, setAnimateModal] = useState(false);

   const navigate = useNavigate()

   const params = useParams();
   const projectId = params.projectId!;

   const { data, isLoading, isError } = useQuery({
      queryKey: ["editProject", projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
   });

   const closeModal = () => {   
      if (modal) {
         setAnimateModal(false);
         setTimeout(() => {
            setModal(false);
         }, 200);
         return;
      }
   }

   const handleClick = () => {
      navigate('?newTask=true')

      setModal(true);
      setTimeout(() => {
         setAnimateModal(true);
      }, 100);
   }

   if (isLoading) return <Spinner></Spinner>;
   if (isError) return <Navigate to={"/404"} />;
   if (data)
      return (
         <>
         {
            modal && 
            <Modal
               animateModal={animateModal}
            >
               <XMarkIcon
                  className="ml-auto size-6 cursor-pointer hover:scale-110 duration-150"
                  onClick={closeModal}
               />
               <AddTask
                  data={data}
               />
            </Modal>
         }
            <div className="flex flex-col items-center space-y-10 md:space-y-0 md:flex-row md:justify-between">
               <div className="flex md:justify-between w-full items-center">
                  <Link to="/">
                     <ChevronLeftIcon className="size-10 text-purple-500 hover:scale-110 hover:text-purple-600 duration-150" />
                  </Link>
                  <div className="flex flex-col items-center text-center md:items-start mx-auto">
                     <div className="flex items-center gap-2">
                        <h1 className="text-4xl font-bold">
                           {data.projectName}
                        </h1>
                        <Link to={`/projects/${data._id}/edit`}>
                           <PencilSquareIcon className="size-6 cursor-pointer hover:scale-125 duration-200 text-purple-500" />
                        </Link>
                     </div>
                     <p className="text-lg text-gray-800 dark:text-gray-300 md:ml-24">
                        Proyecto de{" "}
                        <span className="text-purple-500">
                           {data.clientName}
                        </span>
                     </p>
                  </div>
               </div>

               <button 
                  className="text-white bg-purple-500 py-2 px-8 md:p-2 rounded-full hover:bg-purple-600 duration-200 text-xl group relative flex items-center"
                  onClick={handleClick} 
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
         </>
      );
}
