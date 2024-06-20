import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProjectForm from "../../components/projects/ProjectForm";
import { ProjectFormData } from "../../types";
import { createProject } from "../../api/ProjectAPI";

export default function CreateProjectView() {
   const navigate = useNavigate();
   const initialValues: ProjectFormData = {
      projectName: "",
      clientName: "",
      description: "",
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const mutation = useMutation({
      mutationFn: createProject,
      onError: (error) => {
         toast.error(error.message)
      },
      onSuccess: (response) => {
         response.status === "success" &&
            toast.success("Proyecto creado correctamente", {
               autoClose: 3000,
            });
         navigate("/");
      },
   });

   const handleForm = (data: ProjectFormData) => mutation.mutate(data);

   return (
      <>
         <div className="flex flex-col items-center md:flex-row md:justify-between mx-auto max-w-screen-lg">
            <div className="flex flex-col items-center">
               <h1 className="text-4xl font-bold">Crear Proyecto</h1>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Crea</span> un nuevo
                  proyecto
               </p>
            </div>

            <nav className="my-5">
               <Link
                  to="/"
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Mis Proyectos
               </Link>
            </nav>
         </div>

         <form
            className="mt-10 bg-white shadow-xl dark:bg-neutral-700 dark:shadow-neutral-900 p-10 rounded-md max-w-3xl mx-auto"
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
