import { Task } from "../../types";
import { useNavigate, useLocation } from "react-router-dom";

type TypeCardProps = {
   task: Task;
};

export default function TaskCard({
   task,
}: TypeCardProps) {
   const navigate = useNavigate();
   const location = useLocation();
   return (
      <li className="py-3 px-2 bg-gray-100 dark:bg-neutral-800">
         <div>
            <button
               className={`text-lg hover:translate-x-1 hover:scale-105 duration-300 ${task.status === 'completed' && 'line-through opacity-50'}`}
               onClick={() => {
                  navigate(location.pathname + `?taskId=${task._id}`);
               }}
            >
               {task.name}
            </button>
            <p className={`opacity-80 text-sm w-2/3 whitespace-nowrap text-ellipsis overflow-hidden ${task.status === 'completed' && 'line-through opacity-50'}`}>
               {task.description}
            </p>
         </div>
      </li>
   );
}
