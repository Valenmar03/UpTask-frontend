import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Bars3Icon, UserIcon, ArrowRightEndOnRectangleIcon, FolderIcon  } from '@heroicons/react/20/solid'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

export default function NavMenu({user} : {user: User}) {

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
    setTimeout(() => {
      navigate('/auth/login')
    }, 1000);
  }

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-1 rounded-lg shadow-md hover:shadow-neutral-600 focus:shadow-neutral-600  duration-200">
        <Bars3Icon className='w-8 h-8 text-gray-300 ' />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-min -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-56 shrink rounded-xl bg-white text-neutral-900 p-4 text-sm font-semibold leading-6 shadow-lg">
            <p className='text-center text-lg text-purple-500 font-bold'>{user.name}</p>
            <Link
              to='/profile'
              className='p-2 hover:text-purple-800 flex gap-3'
            >
              <UserIcon className='size-6'/>
              Mi Perfil
            </Link>
            <Link
              to='/'
              className='flex gap-3 p-2 hover:text-purple-800'
            >
              <FolderIcon className='size-6'/>
              Mis Proyectos</Link>
            <button
              className='p-2 hover:text-red-600 flex gap-3'
              type='button'
              onClick={logout}
            >
              <ArrowRightEndOnRectangleIcon className='size-6' />
              Cerrar Sesión
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}