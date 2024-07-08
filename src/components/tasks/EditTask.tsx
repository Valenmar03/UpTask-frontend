import { useForm } from "react-hook-form";
import { Task, TaskFormData } from "../../types";
import StatusBadge from "./StatusBadge";
import TaskForm from "./TaskForm";

export default function EditTask({ data }: { data: Task }) {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm<TaskFormData>({
      defaultValues: {
         name: data.name,
         description: data.description,
      },
   });

   const handleEditTask = (formData: TaskFormData) => {
      console.log(formData);
   };

   return (
      <>
         <h2 className="text-4xl font-bold px-10">
            Editar <span className="text-purple-600">Tarea</span>
         </h2>
         <p className=" px-10 mb-2">
            Edite{" "}
            <span className="text-purple-500">{`${data.name}`}</span>
         </p>
         <StatusBadge status={data.status} />
         <form onSubmit={handleSubmit(handleEditTask)} className="px-10 mt-3">
            <TaskForm register={register} errors={errors} />

            <input
               type="submit"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
               value="Guardar Cambios"
            />
         </form>
      </>
   );
}
