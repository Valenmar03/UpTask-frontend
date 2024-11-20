import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import { checkPasswordForm, Project } from "../../types";
import { useForm } from "react-hook-form";
import { checkPassword } from "../../api/AuthAPI";

type DeleteProjectModalProps = {
   setModal: React.Dispatch<React.SetStateAction<boolean>>;
   project: Project;
   closeModal: () => void;
};

export default function DeleteProjectModal({
   setModal,
   project,
   closeModal,
}: DeleteProjectModalProps) {
   const initialValues: checkPasswordForm = {
      password: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const queryClient = useQueryClient();
   const deletePassword = useMutation({
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

   const checkPasswordMutation = useMutation({
      mutationFn: checkPassword,
      onError: (error) => {
         error.message === "Incorrect Password" &&
            toast.error("Contraseña Incorrecta");
      }
   });

   const handleDeletePassword = async (formData: checkPasswordForm) => {
      await checkPasswordMutation.mutateAsync(formData);
      await deletePassword.mutateAsync(project._id)
   };

   return (
      <div
         className="bg-gray-100 dark:bg-neutral-800 w-10/12 md:w-2/3 lg:w-1/2 xl:w-1/4 p-5 mt-48 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto"
         onClick={(e) => e.stopPropagation()}
      >
         <div className=" text-balance w-full mx-auto">
            <h2 className="text-3xl mt-3 text-red-600">Eliminar Proyecto</h2>
            <p className=" mt-3 mx-3 text-gray-600 dark:text-gray-300 text-center">
               Ingrese su contraseña para eliminar{" "}
               <span className="text-red-600">{project.projectName}</span>
            </p>
            <form
               className="xl:mx-10 mt-5"
               noValidate
               onSubmit={handleSubmit(handleDeletePassword)}
            >
               <div className="flex flex-col">
                  <input
                     id="password"
                     type="password"
                     placeholder="Ingrese su contraseña"
                     className={`p-3 bg-gray-200 text-black rounded ${
                        errors.password && "border-l-4 border-red-600"
                     }`}
                     {...register("password", {
                        required: "Contraseña obligatoria",
                     })}
                  />
                  {errors.password && (
                     <p className="text-red-600">{errors.password.message}</p>
                  )}
               </div>
               <div className="flex flex-col gap-3 xl:gap-0 xl:flex-row justify-around mt-5">
                  <button
                     className="rounded-md px-12 py-3 text-lg bg-red-600 hover:bg-red-700 duration-200 disabled:cursor-not-allowed disabled:bg-opacity-70"
                     type="submit"
                  >
                     Eliminar
                  </button>
                  <button
                     className="rounded-md px-12 py-3 text-lg bg-transparent dark:hover:bg-neutral-600 duration-200"
                     onClick={closeModal}
                     type="button"
                  >
                     Cancelar
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
