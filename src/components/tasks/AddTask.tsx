import { Project } from "../../types";
import TaskForm from "./TaskForm";
import { useForm } from "react-hook-form";
import { TaskFormData } from "../../types";

export default function AddTask({ data }: { data: Project }) {

   const initialValues : TaskFormData = {
      name: "",
      description: ""
   }
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const handleForm = (data: TaskFormData) => {
      console.log(data)
   }
   return (
      <>
         <h2 className="text-4xl font-bold px-10">
            Nueva <span className="text-purple-600">Tarea</span>
         </h2>
         <p className="my-3 px-10">
            Agregue una tarea a{" "}
            <span className="text-purple-500">{`${data.projectName}`}</span>
         </p>

         <form
            className=" my-5 px-10 rounded-md max-w-3xl mx-auto"
            onSubmit={handleSubmit(handleForm)}
            noValidate
         >

            <TaskForm
               register={register}
               errors={errors}
            />
            <input
               type="submit"
               value="Crear Proyecto"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>
      </>
   );
}
