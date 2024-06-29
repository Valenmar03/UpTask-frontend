import { useNavigate } from "react-router-dom";
import { Task } from "../../types";
import TaskCard from "./TaskCard";

type TaskListProps = {
   tasks: Task[];
};

type GroupedTasks = {
   [key: string]: Task[];
};

const initialStatusGroups: GroupedTasks = {
   pending: [],
   onHold: [],
   inProgress: [],
   underReview: [],
   completed: [],
};

export default function TaskList({ tasks }: TaskListProps) {
   const navigate = useNavigate();

   const groupedTasks = tasks.reduce((acc, task) => {
      let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
      currentGroup = [...currentGroup, task];
      return { ...acc, [task.status]: currentGroup };
   }, initialStatusGroups);

   return (
      <>
         {tasks.length ? (
            <div className="flex gap-5 overflow-x-scroll 2xl:overflow-auto pb-32">
               {Object.entries(groupedTasks).map(([status, tasks]) => (
                  <div key={status} className="min-w-[300px] 2xl:min-w-0 2xl:w-1/5">
                     <h3 key={`${status}Title`} className="mt-10 text-center text-xl capitalize border-b-4 pb-2 w-[75%] mx-auto">
                        {status}
                     </h3>
                     <div
                        key={`${status}List`}
                        className="p-1 rounded bg-gray-300 dark:bg-neutral-900 mt-5 min-h-full"
                     >
                        <ul className="divide-y-4 divide-gray-300 dark:divide-neutral-900">
                           {tasks.map((task) => (
                              <TaskCard key={task._id} task={task} />
                           ))}
                        </ul>
                     </div>
                  </div>
               ))}
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
                     onClick={() => navigate("?newProject=true")}
                  >
                     Aquí
                  </span>
               </p>
            </div>
         )}
      </>
   );
}
