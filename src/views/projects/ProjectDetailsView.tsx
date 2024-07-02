import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/ProjectAPI";
import { XMarkIcon } from "@heroicons/react/20/solid";

import Spinner from "../../components/Spinner";
import Modal from "../../components/Modal";
import AddTask from "../../components/tasks/AddTask";
import ProjectDetailsHeader from "../../components/projects/ProjectDetailsHeader";
import TaskList from "../../components/tasks/TaskList";
import DetailsTaskModal from "../../components/tasks/DetailsTaskModal";

export default function ProjectDetailsView() {
   const [animateModal, setAnimateModal] = useState(false);

   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const modalCreateTask = queryParams.get("newTask");
   const modalTaskDetails = queryParams.get("taskId");

   const show = modalCreateTask ? modalCreateTask : modalTaskDetails;

   const navigate = useNavigate();

   const params = useParams();
   const projectId = params.projectId!;

   const { data, isLoading, isError } = useQuery({
      queryKey: ["editProject", projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
   });

   useEffect(() => {
      if (show) {
         setTimeout(() => {
            setAnimateModal(true);
         }, 100);
         return;
      }
   }, [show]);

   const closeModal = () => {
      setAnimateModal(false);
      setTimeout(() => {
         navigate("", { replace: true });
      }, 300);
   };

   if (isLoading) return <Spinner></Spinner>;
   if (isError) return <Navigate to={"/404"} />;
   if (data)
      return (
         <>
            {show && (
               <Modal animateModal={animateModal}>
                  <div className="bg-gray-100 dark:bg-neutral-800 w-10/12 md:w-2/5 p-5 mt-48 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto">
                     <XMarkIcon
                        className="ml-auto size-6 cursor-pointer hover:scale-110 duration-150 mb-3"
                        onClick={closeModal}
                     />
                     {
                        modalCreateTask ? (
                           <AddTask data={data}/>
                        ) : (
                           <DetailsTaskModal/>
                        )
                     }
                  </div>
               </Modal>
            )}
            <ProjectDetailsHeader data={data} />
            <TaskList tasks={data.tasks} />
         </>
      );
}
