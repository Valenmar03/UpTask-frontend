import { useForm } from "react-hook-form";
import { Task, TaskFormData } from "../../types";
import StatusBadge from "./StatusBadge";
import TaskForm from "./TaskForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

type EditTaskProps = {
   data: Task;
   setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EditTask({ data, setEditTask }: EditTaskProps) {
   const navigate = useNavigate();
   const params = useParams();
   const projectId = params.projectId!;
   const queryClient = useQueryClient();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<TaskFormData>({
      defaultValues: {
         name: data.name,
         description: data.description,
      },
   });

   const { mutate } = useMutation({
      mutationFn: updateTask,
      onError: () => {
         toast.error("Error editando tarea");
      },
      onSuccess: () => {
         toast.success("Tarea editada correctamente");
         queryClient.invalidateQueries({
            queryKey: ["editProject", projectId],
         });
         setEditTask(false);
         navigate("", { replace: true });
      },
   });

   const handleEditTask = (formData: TaskFormData) => {
      const queryData = {
         projectId,
         taskId: data._id,
         formData,
      };
      mutate(queryData);
   };

   return (
      <>
         <h2 className="text-4xl font-bold px-10">
            Editar <span className="text-purple-600">Tarea</span>
         </h2>
         <p className=" px-10 mb-2">
            Edite <span className="text-purple-500">{`${data.name}`}</span>
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
