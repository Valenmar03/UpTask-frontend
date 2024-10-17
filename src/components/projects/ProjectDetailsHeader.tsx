import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
   PencilSquareIcon,
   ChevronLeftIcon,
   UserIcon,
   DocumentPlusIcon,
} from "@heroicons/react/20/solid";
import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import { Project } from "../../types";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";

export default function ProjectDetailsHeader({ data }: { data: Project }) {
   const navigate = useNavigate();
   const { data: user } = useAuth();

   if (user)
      return (
         <div className="flex flex-col items-center space-y-5 md:space-y-0 md:flex-row md:justify-between">
            <div className="flex md:justify-between w-full items-center">
               <Link to="/">
                  <ChevronLeftIcon className="size-10 hidden md:flex text-purple-500 hover:scale-110 hover:text-purple-600 duration-150" />
               </Link>
               <div className="flex flex-col items-center md:items-start mx-auto">
                  <div className="flex flex-col md:flex-row items-center gap-2 mx-auto">
                     <h1 className="text-3xl md:text-4xl font-bold">
                        {data.projectName}
                     </h1>
                     {isManager(user._id, data.manager) && (
                        <Link
                           to={`/projects/${data._id}/edit`}
                           className="relative group"
                        >
                           <PencilSquareIcon className="size-6 cursor-pointer hover:scale-125 duration-200 text-purple-500 md:ml-2" />
                           <div className="ease-in duration-300 opacity-0 group-hover:block group-hover:opacity-100 transition-all">
                              <div className="ease-in-out duration-300 translate-x-4 pointer-events-none transition-all group-hover:translate-x-6 absolute left-1/2 z-50 flex -translate-y-full flex-col items-center rounded-sm text-center text-sm text-slate-300 before:top-[50%]">
                                 <div className="rounded-md bg-black py-2 px-3">
                                    <p className="whitespace-nowrap">
                                       Editar Proyecto
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     )}
                  </div>
                  <p className="text-xl text-gray-800 dark:text-gray-300 mx-auto">
                     {data.description}
                  </p>
                  <p className="text-lg text-gray-800 dark:text-gray-300 mx-auto">
                     Proyecto de{" "}
                     <span className="text-purple-500">{data.clientName}</span>
                  </p>
               </div>
            </div>
            <Menu as="div" className="relative flex-none">
               <Menu.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 text-purple-500">
                  <EllipsisHorizontalCircleIcon
                     className="size-10 hover:scale-110 duration-150"
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
                  <Menu.Items className="absolute -right-6 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-900/5 focus:outline-none dark:bg-neutral-700">
                     <Menu.Item>
                        <Link
                           to={"team"}
                           className="w-full text-left p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 rounded-t-md flex gap-2"
                        >
                           <UserIcon className="size-6" />
                           Colaboradores
                        </Link>
                     </Menu.Item>
                     <Menu.Item>
                        <button
                           onClick={() => navigate("?newTask=true")}
                           className={`w-full text-left p-2 hover:bg-neutral-300 dark:hover:bg-neutral-600 ${
                              isManager(user._id, data.manager)
                                 ? "rounded-b-md"
                                 : "rounded-md"
                           } flex gap-2`}
                        >
                           <DocumentPlusIcon className="size-6" />
                           Agregar Tarea
                        </button>
                     </Menu.Item>
                  </Menu.Items>
               </Transition>
            </Menu>
         </div>
      );
}
