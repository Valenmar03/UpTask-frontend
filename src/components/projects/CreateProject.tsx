import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectAPI";

export default function CreateProject() {
   const initialValues: ProjectFormData = {
      projectName: "",
      clientName: "",
      description: "",
   };

   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const mutation = useMutation({
      mutationFn: createProject,
      onError: (error) => {
         toast.error(error.message);
      },
      onSuccess: (response) => {
         response.status === "success" &&
            toast.success("Proyecto creado correctamente", {
               autoClose: 3000,
            });
         queryClient.invalidateQueries({ queryKey: ["projects"] });
         navigate("", { replace: true });
      },
   });

   const handleForm = (data: ProjectFormData) => mutation.mutate(data);

   return (
      <>
         <h2 className="text-4xl font-bold px-10 mt-5">
            Nuevo <span className="text-purple-600">Proyecto</span>
         </h2>
         <p className="my-3 px-10">
            Agregue un
            <span className="text-purple-500"> Proyecto</span>
         </p>
         <form
            className=" my-5 px-10 rounded-md max-w-3xl mx-auto"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >
            <ProjectForm register={register} errors={errors} />
            <input
               type="submit"
               value="Crear Proyecto"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>
      </>
   );
}
