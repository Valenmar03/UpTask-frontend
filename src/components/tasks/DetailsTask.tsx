import { Task } from "../../types";
import { PencilIcon } from "@heroicons/react/20/solid";
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
               <h2 className="text-4xl font-bold px-10 group flex flex-col sm:flex-row sm:items-center mb-1 mt-5">
                  {data.name}
                  <PencilIcon
                     className="size-6 sm:invisible group-hover:visible ml-2 text-purple-600 cursor-pointer"
                     onClick={() => setEditTask(true)}
                  />
               </h2>
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
