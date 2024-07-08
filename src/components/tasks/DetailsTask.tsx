import { Task } from "../../types";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import StatusBadge from "./StatusBadge";
import { useState } from "react";
import EditTask from "./EditTask";

export default function DetailsTask({ data }: { data: Task }) {
   const [editTask, setEditTask] = useState(false);

   return (
      <>
         {editTask ? (
            <EditTask data={data} setEditTask={setEditTask} />
         ) : (
            <>
               <div className="flex flex-col sm:flex-row sm:justify-between group sm:items-center mb-2">
                  <h2 className="text-4xl font-bold px-10 mb-1 mt-5 ">
                     {data.name}
                  </h2>
                  <div className="flex items-center space-x-2 mx-2 px-10">
                     <PencilIcon
                        className="size-7 hover:scale-110  duration-150 text-purple-600 cursor-pointer"
                        onClick={() => setEditTask(true)}
                     />
                     <TrashIcon className="size-7 hover:scale-110 duration-150 text-red-600 cursor-pointer" />
                  </div>
               </div>
               <StatusBadge status={data.status} />
               <div className="px-10 mt-10">
                  <h3 className="text-xl group flex items-center">
                     Descripcion
                  </h3>
                  <p>{data.description}</p>
               </div>
            </>
         )}
      </>
   );
}
