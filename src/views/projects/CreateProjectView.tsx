import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "../../components/projects/ProjectForm";

export default function CreateProjectView() {
   const initialValues = {
      projectName: "",
      clientName: "",
      description: "",
   };
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const handleForm = () => {
      console.log('GHola');
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

               <ProjectForm
                  register={register}
                  errors={errors}
               />
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
