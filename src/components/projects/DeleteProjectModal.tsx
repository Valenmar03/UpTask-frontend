import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import { Project } from "../../types";

type DeleteProjectModalProps = {
    setModal: React.Dispatch<React.SetStateAction<boolean>>
    project: Project
    closeModal: () => void
}

export default function DeleteProjectModal({setModal, project, closeModal} : DeleteProjectModalProps) {

    const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: deleteProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         setModal(false);
         toast.success("Proyecto Eliminado correctamente");
         queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refrescar datos
      },
   });
   return (
      <div
         className="bg-gray-100 dark:bg-neutral-800 w-10/12 md:w-1/4 p-5 mt-48 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto"
         onClick={(e) => e.stopPropagation()}
      >
         <div className="text-center text-balance w-full mx-auto">
            <h2 className="text-xl mt-3">
               ¿Seguro que desea eliminar{" "}
               <span className="text-red-500 font-bold">{`${project.projectName}`}</span>
               ?
            </h2>
            <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
               Cliente: {`${project.clientName}`}
            </p>
            <div className="flex flex-col space-y-3 xl:px-10 mx-auto mt-7 gap-3 md:gap-0 w-full justify-evenly">
               <button
                  className="py-3 px-10 text-white bg-red-600 rounded-md hover:bg-red-500 duration-200"
                  onClick={() => mutate(project._id)}
               >
                  Eliminar
               </button>
               <button
                  className="py-3 px-10 text-gray-800 dark:border-neutral-600 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 duration-200"
                  onClick={closeModal}
               >
                  Cancelar
               </button>
            </div>
         </div>
      </div>
   );
}
