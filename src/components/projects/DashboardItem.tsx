import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import {  ProjectDashboard } from "../../types";
import Modal from "../Modal";
import { useAuth } from "../../hooks/useAuth";
import { isManager } from "../../utils/policies";
import DeleteProjectModal from "./DeleteProjectModal";

export default function DashboardItem({ project }: { project: ProjectDashboard }) {
   const [modal, setModal] = useState(false);
   const [animateModal, setAnimateModal] = useState(false);

   const openModal = () => {
      setModal(true);
      setTimeout(() => {
         setAnimateModal(true);
      }, 100);
   };

   const closeModal = () => {
      setAnimateModal(false);
      setTimeout(() => {
         setModal(false);
      }, 200);
   };

   
   const { data: user } = useAuth();

   if(user) return (
      <li className="px-5 py-8 shadow-xl bg-white dark:bg-neutral-700 dark:shadow-neutral-900 flex justify-between group">
         {modal && (
            <Modal animateModal={animateModal} closeModal={closeModal}>
               <DeleteProjectModal setModal={setModal} project={project} closeModal={closeModal}/>
            </Modal>
         )}
         <div>
            {isManager(user._id, project.manager) ? (
               <p className="inline text-xs font-semibold px-4 py-1 uppercase bg-green-300 text-green-700 border border-green-700 rounded-full">
                  Manager
               </p>
            ) : (
               <p className="inline text-xs font-semibold px-4 py-1 uppercase bg-blue-300 text-blue-700 border border-blue-700 rounded-full">
                  Colaborador
               </p>
            )}

            <Link
               to={`/projects/${project._id}`}
               className="text-3xl my-2 font-semibold flex items-center hover:translate-x-5 hover:scale-110 hover:opacity-95 duration-300"
            >
               {project.projectName}
            </Link>
            <p className="text-gray-700 dark:text-gray-300">
               {project.clientName}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
               {project.description}
            </p>
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
                           to={`/projects/${project._id}`}
                           className={`block px-3 py-1 text-sm leading-6 ${
                              user?._id !== project.manager && "rounded-b-md"
                           } rounded-t-md dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600 dark:hover:text-white duration-200`}
                        >
                           Ver Proyecto
                        </Link>
                     </Menu.Item>
                     {user?._id === project.manager && (
                        <>
                           <Menu.Item>
                              <Link
                                 to={`/projects/${project._id}/edit`}
                                 className="block px-3 py-1 text-sm leading-6 text-blue-500 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-600 dark:hover:text-white duration-200"
                              >
                                 Editar Proyecto
                              </Link>
                           </Menu.Item>
                           <Menu.Item>
                              <button
                                 type="button"
                                 className="block px-3 py-1 text-sm leading-6 rounded-b-md w-full text-left text-red-500 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 dark:hover:text-white duration-200"
                                 onClick={openModal}
                              >
                                 Eliminar Proyecto
                              </button>
                           </Menu.Item>
                        </>
                     )}
                  </Menu.Items>
               </Transition>
            </Menu>
         </div>
      </li>
   );
}
