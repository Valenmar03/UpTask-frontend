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

   const idsData = {
      taskId: data._id,
      projectId
   }

   const handleEditTask = (formData: TaskFormData) => {
      const queryData = {
         ...idsData,
         formData
      };
      mutate(queryData);
   };

   return (
      <>
         <h2 className="text-4xl font-bold px-10 mt-5">
            Editar <span className="text-purple-600">Tarea</span>
         </h2>
         <p className=" px-10 mb-2">
            Edite <span className="text-purple-500">{`${data.name}`}</span>
         </p>
         <StatusBadge status={data.status} idsData={idsData} />
         <form onSubmit={handleSubmit(handleEditTask)} className="px-10 mt-3">
            <TaskForm register={register} errors={errors} />

            <div className="flex flex-col sm:flex-row justify-center space-y-5 sm:space-y-0 sm:space-x-20">
               <input
                  type="submit"
                  className="text-white bg-purple-500 px-10 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
                  value="Guardar"
               />
               <button
                  className="text-neutral-800 dark:text-neutral-200 px-10 py-3 border-2 dark:border-neutral-700 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-200 text-lg cursor-pointer"
                  onClick={() => setEditTask(false)}
               >
                  Cancelar
               </button>
            </div>
         </form>
      </>
   );
}
