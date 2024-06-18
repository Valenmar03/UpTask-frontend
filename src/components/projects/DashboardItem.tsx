import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

import { Project } from "../../types";

export default function DashboardItem({ project }: { project: Project }) {
   return (
      <li className="px-5 py-8 shadow-xl bg-white dark:bg-neutral-700 dark:shadow-neutral-900 flex justify-between cursor-pointer group">
         <div className="flex flex-col">
            <h2 className="text-3xl mb-2 font-semibold">{project.projectName}</h2>
            <p className="text-gray-700 dark:text-gray-300">{project.clientName}</p>
            <p className="text-gray-700 dark:text-gray-300">{project.description}</p>
         </div>

         <div className="opacity-0 group-hover:opacity-100">
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
                        <Link
                           to={`/projects/${project._id}/edit`}
                           className="block px-3 py-1 text-sm leading-6 rounded-t-md text-blue-500 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-600 duration-200"
                        >
                           Editar Proyecto
                        </Link>
                     </Menu.Item>
                     <Menu.Item>
                        <button
                           type="button"
                           className="block px-3 py-1 text-sm leading-6 rounded-b-md w-full text-left text-red-500 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 duration-200"
                           onClick={() => {}}
                        >
                           Eliminar Proyecto
                        </button>
                     </Menu.Item>
                  </Menu.Items>
               </Transition>
            </Menu>
         </div>
      </li>
   );
}
