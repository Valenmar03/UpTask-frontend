import { Task } from "../../types";
import { useNavigate, useLocation } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

type TypeCardProps = {
   task: Task;
};

export default function TaskCard({ task }: TypeCardProps) {
   const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: task._id,
   });

   const navigate = useNavigate();
   const location = useLocation();

   const theme = localStorage.getItem("theme");

   const style = transform
      ? theme === "dark"
         ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            padding: "1.25rem",
            width: "320px",
            display: "flex",
            borderRadius: "2px",
            backgroundColor: "#262626",
         }
         : {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              padding: "1.25rem",
              width: "320px",
              display: "flex",
              borderRadius: "2px",
              backgroundColor: "#f3f4f6",
           }
      : undefined;

   return (
      <li className="py-3 px-2 bg-gray-100 dark:bg-neutral-800 flex items-start justify-between">
         <div {...listeners} {...attributes} ref={setNodeRef} style={style}>
            <p
               className={`text-lg ${
                  task.status === "completed" && "line-through opacity-50"
               }`}
               onClick={() => {
                  navigate(location.pathname + `?taskId=${task._id}`);
               }}
            >
               {task.name}
            </p>
            <p
               className={`opacity-80 text-sm w-2/3 whitespace-nowrap text-ellipsis overflow-hidden ${
                  task.status === "completed" && "line-through opacity-50"
               }`}
            >
               {task.description}
            </p>
         </div>
         <InformationCircleIcon
            className="size-7 cursor-pointer duration-200"
            onClick={() => {
               navigate(location.pathname + `?taskId=${task._id}`);
            }}
         />
      </li>
   );
}
