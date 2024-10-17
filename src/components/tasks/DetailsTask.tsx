import { useState } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import StatusBadge from "./StatusBadge";
import EditTask from "./EditTask";
import { Task } from "../../types";
import { deleteTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/utils";

export default function DetailsTask({ data }: { data: Task }) {
   const [editTask, setEditTask] = useState(false);

   const params = useParams();
   const projectId = params.projectId!;
   const queryClient = useQueryClient();
   const navigate = useNavigate();

   const { mutate } = useMutation({
      mutationFn: deleteTask,
      onError: () => {
         toast.error("Acción no válida");
      },
      onSuccess: () => {
         toast.success("Tarea Eliminada Correctamente");
         queryClient.invalidateQueries({
            queryKey: ["project", projectId],
         });
         navigate("", { replace: true });
      },
   });
   
   const idsData = {
      taskId: data._id,
      projectId
   }
   const handleDelete = () => {
      mutate(idsData);
   };


   return (
      <>
         {editTask ? (
            <EditTask data={data} setEditTask={setEditTask} />
         ) : (
            <>
               
               <div className="flex flex-col sm:flex-row sm:justify-between group sm:items-center mb-2 mt-5">
                  <h2 className="text-4xl font-bold px-10">{data.name}</h2>
                  <div className="flex items-center space-x-3 mx-2 px-10">
                     <PencilIcon
                        className="size-7 hover:scale-110  duration-150 text-purple-600 cursor-pointer"
                        onClick={() => setEditTask(true)}
                     />
                     <TrashIcon
                        className="size-7 hover:scale-110 duration-150 text-red-600 cursor-pointer"
                        onClick={handleDelete}
                     />
                  </div>
               </div>
               <StatusBadge status={data.status} idsData={idsData}/>
               <div className="px-10 mt-10">
                  <h3 className="text-xl group flex items-center">
                     Descripcion
                  </h3>
                  <p>{data.description}</p>
               </div>
               <div className="px-10 text-xs mt-5 opacity-40">
                  <p>Creado el: <span className="font-bold">{formatDate(data.createdAt)}</span></p>
                  <p>Ultima actualización el: <span className="font-bold">{formatDate(data.updatedAt)}</span></p>
               </div>
            </>
         )}
      </>
   );
}
