import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
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

   const handleForm = async (data: ProjectFormData) => {
      const response = await createProject(data);
      response.status === "success" &&
         toast.success("Proyecto creado correctamente", {
            autoClose: 3000,
         });
      navigate("/");
   };

   return (
      <>
         <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold">Crear Proyecto</h1>
            <p className="text-lg text-gray-800 dark:text-gray-300">
               <span className="text-purple-500">Crea</span> un nuevo proyecto
            </p>

            <nav className="my-5">
               <Link
                  to="/"
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Mis Proyectos
               </Link>
            </nav>

            <form
               className="mt-10 bg-white shadow-xl dark:bg-neutral-700 dark:shadow-neutral-900 p-10 rounded-md"
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
         </div>
      </>
   );
}
