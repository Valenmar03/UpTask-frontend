import { useEffect, useState } from "react";
import TeamMembersHeader from "../../components/projects/Team/TeamMembersHeader";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import AddMemberModal from "../../components/projects/Team/AddMemberModal";
import { useQuery } from "@tanstack/react-query";
import { getProjectTeam } from "../../api/TeamAPI";
import ProjectsItemsLoading from "../../components/Loadings/ProjectsItemsLoading";
import MemberItem from "../../components/projects/Team/MemberItem";

export default function ProjectTeamView() {
   const [animateModal, setAnimateModal] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const modalProject = queryParams.get("addMember");
   const show = modalProject ? true : false;
   const params = useParams();
   const projectId = params.projectId!;

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

   const { data, isLoading, isError } = useQuery({
      queryKey: ["projectTeam", projectId],
      queryFn: () => getProjectTeam(projectId),
      retry: false,
   });

   if(isError) return <Navigate to={'/404'}/>
   return (
      <>
         <TeamMembersHeader />
         {show && (
            <Modal animateModal={animateModal} closeModal={closeModal}>
               <div
                  className="bg-gray-100 dark:bg-neutral-800 w-10/12 lg:w-2/5 p-5 mt-48 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                  <AddMemberModal />
               </div>
            </Modal>
         )}
         {isLoading ? (
               <ul className="mt-10 divide-y-2 divide-gray-200 dark:divide-neutral-800">
                  <ProjectsItemsLoading />
                  <ProjectsItemsLoading />
               </ul>
         ) : data && data.length ? (
               <ul className="mt-10 divide-y-2 divide-gray-200 dark:divide-neutral-800">
                  {data.map(member => (
                     <MemberItem key={member._id} member={member}/>
                  ))}
               </ul>
            )  : (
               <p className="text-lg text-center py-20 ">
                  No tienes Colaboradores.{" "}
                  <button
                     onClick={() => navigate("?addMember=true")}
                     className=" font-bold text-purple-700 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-400"
                  >
                     Añade uno
                  </button>
               </p>
            )}
      </>
   );
}
