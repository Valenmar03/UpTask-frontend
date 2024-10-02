import { useEffect, useState } from "react";
import TeamMembersHeader from "../../components/projects/Team/TeamMembersHeader";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import AddMemberModal from "../../components/projects/Team/AddMemberModal";

export default function ProjectTeamView() {
   const [animateModal, setAnimateModal] = useState(false);

   const location = useLocation();
   const navigate = useNavigate();
   const queryParams = new URLSearchParams(location.search);
   const modalProject = queryParams.get("addMember");
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

   return (
      <>
         <TeamMembersHeader />
         {show && (
            <Modal animateModal={animateModal} closeModal={closeModal}>
               <div
                  className="bg-gray-100 dark:bg-neutral-800 w-10/12 lg:w-2/5 p-5 mt-48 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto"
                  onClick={(e) => e.stopPropagation()}
               >
                <AddMemberModal/>
               </div>
            </Modal>
         )}
      </>
   );
}
