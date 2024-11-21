import { useNavigate, useParams } from "react-router-dom";
import { Project, Task, TaskStatus } from "../../types";
import TaskCard from "./TaskCard";
import DropTask from "./DropTask";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeStatus } from "../../api/TaskAPI";
import { toast } from "react-toastify";

type TaskListProps = {
   tasks: Task[];
};

type GroupedTasks = {
   [key: string]: Task[];
};

type statusTranslations = {
   name: string;
   color: string;
};

const initialStatusGroups: GroupedTasks = {
   pending: [],
   onHold: [],
   inProgress: [],
   underReview: [],
   completed: [],
};

const statusTranslations: { [key: string]: statusTranslations } = {
   pending: {
      name: "Pendiente",
      color: "border-b-indigo-400",
   },
   onHold: {
      name: "En Espera",
      color: "border-b-red-500",
   },
   inProgress: {
      name: "En Progreso",
      color: "border-b-blue-500",
   },
   underReview: {
      name: "En Revision",
      color: "border-b-orange-400",
   },
   completed: {
      name: "Completada",
      color: "border-b-green-500",
   },
};

export default function TaskList({ tasks }: TaskListProps) {
   const navigate = useNavigate();

   const groupedTasks = tasks.reduce((acc, task) => {
      let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
      currentGroup = [...currentGroup, task];
      return { ...acc, [task.status]: currentGroup };
   }, initialStatusGroups);

   const params = useParams();
   const projectId = params.projectId!;
   const queryClient = useQueryClient();
   const { mutate } = useMutation({
      mutationFn: changeStatus,
      onError: () => {
         toast.error("Error cambiando el estado");
      },
      onSuccess: () => {
         toast.success("Estado modificado correctamente");
         queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      },
   });

   const handleDragEnd = (e: DragEndEvent) => {
      const { over, active } = e;

      if (over && over.id) {
         const taskId = active.id.toString();
         const status = over.id as TaskStatus;
         mutate({ projectId, taskId, status });

         queryClient.setQueryData(["project", projectId], (prevData) => {
            console.log(prevData)
            const updatedTask = prevData.tasks.map((task: Task) => {
               if (task._id === taskId) {
                  return {
                     ...task,
                     status,
                  };
               }
               return task;
            });

            return {
               ...prevData,
               tasks: updatedTask,
            }
         });
      }
   };

   return (
      <>
         {tasks.length ? (
            <div className="flex gap-1 overflow-x-scroll 2xl:overflow-auto pb-32">
               <DndContext onDragEnd={handleDragEnd}>
                  {Object.entries(groupedTasks).map(([status, tasks]) => (
                     <div
                        key={status}
                        className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5"
                     >
                        <h3
                           key={`${status}Title`}
                           className={`mt-10 text-center text-xl capitalize border-b-4 ${statusTranslations[status].color} pb-2 w-[75%] mx-auto`}
                        >
                           {statusTranslations[status].name}
                        </h3>

                        <DropTask status={status} />
                        <div
                           key={`${status}List`}
                           className="p-1 rounded bg-gray-300 dark:bg-neutral-900 mt-5 min-h-full"
                        >
                           {groupedTasks[status].length ? (
                              <ul className="divide-y-4 divide-gray-300 dark:divide-neutral-900">
                                 {tasks.map((task) => (
                                    <TaskCard key={task._id} task={task} />
                                 ))}
                              </ul>
                           ) : (
                              <p className="text-center mt-5 text">
                                 No hay Tareas
                              </p>
                           )}
                        </div>
                     </div>
                  ))}
               </DndContext>
            </div>
         ) : (
            <div className="space-y-2">
               <p className="mx-auto text-lg mt-20 text-center">
                  No hay tareas aún...
               </p>
               <p className="text-center text-lg">
                  Crea una pulsando{" "}
                  <span
                     className="text-purple-600 cursor-pointer hover:text-purple-500"
                     onClick={() => navigate("?newTask=true")}
                  >
                     Aquí
                  </span>
               </p>
            </div>
         )}
      </>
   );
}
