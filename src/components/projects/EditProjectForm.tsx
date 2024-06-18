import { Link } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import { ProjectFormData } from "../../types";


type EditProjectFormProps = {
    data: ProjectFormData
}


export default function EditProjectForm({data} : EditProjectFormProps) {
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

   const handleForm = (formData: ProjectFormData) => {
        console.log(formData)
   };

   return (
      <>
         <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center">
               <h1 className="text-4xl font-bold">Editar Proyecto</h1>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Edita</span> {`${data.projectName} de ${data.clientName}`}
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
               value="Guardar Cambios"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>
      </>
   );
}
