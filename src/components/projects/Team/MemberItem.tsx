import { Menu, Transition } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react'
import Modal from '../../Modal';
import { TeamMember } from '../../../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMemberFromTeam } from '../../../api/TeamAPI';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

type MemberItemProps = {
    member: TeamMember
}

export default function MemberItem({ member } : MemberItemProps) {
    const [modal, setModal] = useState(false);
   const [animateModal, setAnimateModal] = useState(false);
   const params = useParams()
   const projectId = params.projectId!
   const queryClient = useQueryClient()

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

   const { mutate } = useMutation({
        mutationFn: deleteMemberFromTeam,
        onError: (error) =>{
            toast.error(error.message === 'The User is not a member of team' && 'El usuario no pertenece al equipo')
        },
        onSuccess: () => {
            toast.success('Colaborador eliminado correctamente')
            queryClient.invalidateQueries({queryKey: ['projectTeam']})
        }
   })

   return (
    <li className="px-5 py-8 shadow-xl bg-white dark:bg-neutral-700 dark:shadow-neutral-900 flex justify-between group">
       {modal && (
          <Modal animateModal={animateModal} closeModal={closeModal}>
             <div 
                className="bg-gray-100 dark:bg-neutral-800 w-10/12 md:w-1/4 p-5 mt-48 md:mx-auto rounded-md transition-all ease-in duration-300 mx-auto"
                onClick={e => e.stopPropagation()}
             >
                <div className="text-center text-balance w-full mx-auto">
                   <h2 className="text-xl mt-3">
                      {`¿Seguro que desea eliminar a ${member.name} del equipo?`}
                   </h2>
                   <p className="text-sm mt-3 text-gray-600 dark:text-gray-300">
                      {`Correo: ${member.email}`}
                   </p>
                   <div className="flex flex-col space-y-3 xl:px-10 mx-auto mt-7 gap-3 md:gap-0 w-full justify-evenly">
                      <button
                         className="py-3 px-10 text-white bg-red-600 rounded-md hover:bg-red-500 duration-200"
                         onClick={() => mutate({projectId, userId: member._id})}
                      >
                         Eliminar
                      </button>
                      <button
                         className="py-3 px-10 text-gray-800 dark:border-neutral-600 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-neutral-600 duration-200"
                         onClick={closeModal}
                      >
                         Cancelar
                      </button>
                   </div>
                </div>
             </div>
          </Modal>
       )}
       <div className="flex flex-col">
          <p
             className="text-3xl mb-2 font-semibold hover:translate-x-5 hover:scale-110 hover:opacity-95 duration-300"
          >
             {member.name}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
             {member.email}
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
                      <button
                         type="button"
                         className="block px-3 py-1 text-sm leading-6 rounded-b-md rounded-t-md w-full text-left text-red-500 dark:text-red-200 hover:bg-red-200 dark:hover:bg-red-600 dark:hover:text-white duration-200"
                         onClick={openModal}
                      >
                         Eliminar del Equipo
                      </button>
                   </Menu.Item>
                </Menu.Items>
             </Transition>
          </Menu>
       </div>
    </li>
  )
}
