import { Task } from "../../types";

type TypeCardProps = {
   task: Task;
};

export default function TaskCard({ task }: TypeCardProps) {
   return (
      <li className="py-3 px-2 bg-gray-100 dark:bg-neutral-800  ">
         <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            <button className="text-lg hover:translate-x-1 hover:scale-105 duration-300">
               {task.name}
            </button>
            <p className="opacity-80 text-sm w-2/3 whitespace-nowrap text-ellipsis overflow-hidden">
               {task.description}
            </p>
         </div>
      </li>
   );
}
