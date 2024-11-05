import { Fragment, useState } from "react";

import {
   EllipsisVerticalIcon,
   PencilIcon,
   TrashIcon,
   ArchiveBoxIcon,
   XMarkIcon,
} from "@heroicons/react/20/solid";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import StatusBadge from "./StatusBadge";
import EditTask from "./EditTask";
import { Task } from "../../types";
import { deleteTask } from "../../api/TaskAPI";
import { toast } from "react-toastify";
import { formatDate } from "../../utils/utils";
import { Menu, Transition } from "@headlessui/react";
import { statusTranslations } from "../../locales/es";
import { statusStyles } from "../../locales/StatusStyles";
import NotesPanel from "../notes/NotesPanel";

export default function DetailsTask({
   data,
   canEdit,
}: {
   data: Task;
   canEdit: boolean;
}) {
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
      projectId,
   };
   const handleDelete = () => {
      mutate(idsData);
   };

   const [showHistory, setShowHistory] = useState(false)
   const theme = localStorage.getItem("theme");

   return (
      <>
         {editTask ? (
            <EditTask data={data} setEditTask={setEditTask} />
         ) : (
            <>
               <div className="flex justify-between group items-center mb-2 mt-5">
                  <h2 className="text-4xl font-bold px-10">{data.name}</h2>
                  <div>
                     <Menu as="div" className="relative flex-none">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                           <span className="sr-only">opciones</span>
                           <EllipsisVerticalIcon
                              className="h-9 w-9 dark:text-gray-300 dark:hover:text-white hover:scale-110 duration-150"
                              aria-hidden="true"
                           />
                        </Menu.Button>
                        <Transition
                           as={Fragment}
                           enter="transition ease-out duration-100"
                           enterFrom="transform opacity-0 scale-95"
                           enterTo="transform opacity-100 scale-100"
                           leave="transition ease-in duration-75"
                           leaveFrom="transform opacity-100 scale-100"
                           leaveTo="transform opacity-0 scale-95"
                        >
                           <Menu.Items className="absolute right-0 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none dark:bg-neutral-800">
                              <Menu.Item>
                                 <button
                                    className={`flex gap-3 w-full  px-3 py-1 text-sm leading-6  rounded-t-md dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600 dark:hover:text-white duration-200`}
                                    onClick={() => setShowHistory(true)}
                                 >
                                    <ArchiveBoxIcon className="size-5 hover:scale-110  duration-150 cursor-pointer" />
                                    Ver Historial
                                 </button>
                              </Menu.Item>
                              {canEdit && (
                                 <>
                                    <Menu.Item>
                                       <button
                                          className="flex gap-3 w-full px-3 py-1 text-sm leading-6 text-blue-500 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-600 dark:hover:text-white duration-200 "
                                          onClick={() => setEditTask(true)}
                                       >
                                          <PencilIcon className="size-5 hover:scale-110  duration-150 cursor-pointer" />
                                          Editar Tarea
                                       </button>
                                    </Menu.Item>
                                    <Menu.Item>
                                       <button
                                          type="button"
                                          className="flex gap-3 w-full px-3 py-1 text-sm leading-6 rounded-b-md text-left text-red-500 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 dark:hover:text-white duration-200"
                                          onClick={handleDelete}
                                       >
                                          <TrashIcon className="size-5 hover:scale-110  duration-150 cursor-pointer" />
                                          Eliminar Tarea
                                       </button>
                                    </Menu.Item>
                                 </>
                              )}
                           </Menu.Items>
                        </Transition>
                     </Menu>
                  </div>
               </div>
               <StatusBadge status={data.status} idsData={idsData} />
               <div className="px-10 mt-10">
                  <h3 className="text-xl group flex items-center">
                     Descripcion
                  </h3>
                  <p>{data.description}</p>
               </div>
               <div className="px-10">
                  <NotesPanel
                     notes={data.notes}
                  />
               </div>
                  {
                     showHistory && (
                     data.completedBy.length > 0 ? (
                        <>
                           <div className="flex items-center mx-10 mt-10">
                              <h4 className="ml-auto">Historial de cambios</h4>
                              <XMarkIcon className="size-4 ml-auto cursor-pointer" onClick={() => setShowHistory(false)}/>
                           </div>

                           
                           <ul className="mt-3 bg-gray-200 dark:bg-neutral-700 mx-10 rounded-md">
                              {data.completedBy.map((change, index) => (
                                 <li key={index} className={`w-full flex justify-between py-1 px-24 hover:bg-gray-300 dark:hover:bg-neutral-600
                                 ${index === 0 && 'rounded-t-md'} 
                                 ${index === data.completedBy.length - 1 && 'rounded-b-md'}`}>
                                    <p>
                                       {change.user?.name}   
                                    </p>
                                    <p className={`font-bold
                                          ${
                                             theme === "light"
                                                ? statusStyles[change.status].textColorLight
                                                : statusStyles[change.status].textColorDark
                                          }`}
                                    >
                                       {statusTranslations[change.status]}
                                    </p>
                                 </li>
                              ))}
                           </ul>
                        </>
                     ) : (
                        <div className="flex items-center mx-10 mt-10">
                           <h4 className="ml-auto">No hay historial de cambios</h4>
                           <XMarkIcon className="size-4 ml-auto cursor-pointer" onClick={() => setShowHistory(false)}/>
                        </div>
                     ))
                  }
               <div className="px-10 text-xs mt-5 opacity-40">
                  <p>
                     Creado el:{" "}
                     <span className="font-bold">
                        {formatDate(data.createdAt)}
                     </span>
                  </p>
                  <p>
                     Ultima actualización el:{" "}
                     <span className="font-bold">
                        {formatDate(data.updatedAt)}.
                     </span>{" "}
                     {data.completedBy.length > 0 && (
                        <>
                           Por:{" "}
                           <span className="font-bold">
                              {
                                 data.completedBy[data.completedBy.length - 1]
                                    .user?.name
                              }
                              .
                           </span>
                        </>
                     )}
                  </p>
               </div>
            </>
         )}
      </>
   );
}
