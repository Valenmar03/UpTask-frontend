import { useEffect, useMemo, useState } from "react";
import TeamMembersHeader from "../../components/projects/Team/TeamMembersHeader";
import {
   Navigate,
   useLocation,
   useNavigate,
   useParams,
} from "react-router-dom";
import Modal from "../../components/Modal";
import AddMemberModal from "../../components/projects/Team/AddMemberModal";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectTeam } from "../../api/TeamAPI";
import ProjectsItemsLoading from "../../components/Loadings/ProjectsItemsLoading";
import MemberItem from "../../components/projects/Team/MemberItem";
import { getProjectById } from "../../api/ProjectAPI";
import { Project } from "../../types";
import { useAuth } from "../../hooks/useAuth";

export default function ProjectTeamView() {
   const [animateModal, setAnimateModal] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const modalProject = queryParams.get("addMember");
   const show = modalProject ? true : false;
   const params = useParams();
   const projectId = params.projectId!;
   const queryClient = useQueryClient();

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

   const { data: member, isLoading, isError } = useQuery({
      queryKey: ["projectTeam", projectId],
      queryFn: () => getProjectTeam(projectId),
      retry: false,
   });

   const { data: project } = useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProjectById(projectId),
      retry: false,
   });

   queryClient.invalidateQueries({ queryKey: ["projectTeam"] });


   const { data: user } = useAuth();
   const managerId : Project['manager'] = useMemo(() => project?.manager, [project])

   if (isError) return <Navigate to={"/404"} />;
   if(user)return (
      <>
         <TeamMembersHeader managerId={managerId} userId={user._id}/>
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
         ) : member && member.length ? (
            <ul className="mt-10 divide-y-2 divide-gray-200 dark:divide-neutral-800">
               {member.map((member) => (
                  <MemberItem key={member._id} member={member} userId={user._id} managerId={managerId}/>
               ))}
            </ul>
         ) : (
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
