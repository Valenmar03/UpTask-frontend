import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/ProjectAPI";
import { toast } from "react-toastify";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

type EditProjectFormProps = {
   data: ProjectFormData;
};

export default function EditProjectForm({ data }: EditProjectFormProps) {
   const params = useParams();
   const projectId = params.projectId!;

   const navigate = useNavigate();

   const initialValues: ProjectFormData = {
      projectName: data.projectName,
      clientName: data.clientName,
      description: data.description,
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const queryClient = useQueryClient();

   const { mutate } = useMutation({
      mutationFn: updateProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: ["editProject", projectId],
         }); // Actualiza las queries para obetener informacion nueva
         toast.success("Proyecto editado correctamente");
         navigate("/");
      },
   });

   const handleForm = (formData: ProjectFormData) => {
      const toUpdateData = {
         formData,
         projectId,
      };
      console.log(formData);
      mutate(toUpdateData);
   };

   return (
      <>
         <div className="flex items-center justify-center relative">
            <ChevronLeftIcon 
               className="size-10 hidden md:flex text-purple-500 hover:scale-110 hover:text-purple-600 duration-150 absolute left-0 cursor-pointer" 
               onClick={() => navigate(-1)}   
            />

            <div className="flex flex-col items-center mx-auto">
               <h3 className="text-4xl font-bold">Editar Proyecto</h3>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Edita</span>{" "}
                  {`${data.projectName} de ${data.clientName}`}
               </p>
            </div>
         </div>

         <form
            className="mt-10 bg-white shadow-xl dark:bg-neutral-700 dark:shadow-neutral-900 p-10 rounded-md max-w-3xl mx-auto"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >
            <ProjectForm register={register} errors={errors} />
            <input
               type="submit"
               value="Guardar Cambios"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>
      </>
   );
}
