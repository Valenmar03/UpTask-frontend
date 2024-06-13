import { Link } from "react-router-dom"

export default function CreateProjectView() {
  return (
    <>
         <h1 className="text-4xl font-bold">Crear Proyecto</h1>
         <p className="text-lg text-gray-800 dark:text-gray-300">
            <span className="text-indigo-500">Crea</span> un nuevo proyecto
         </p>

         <nav className="my-5">
            <Link
               to="/"
               className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-400 duration-200 text-xl"
            >
               Mis Proyectos
            </Link>
         </nav>
      </>
  )
}
