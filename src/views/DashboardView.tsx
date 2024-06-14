import { Link } from "react-router-dom";

export default function DashboardView() {
   return (
      <>
         <div className="flex flex-col items-center md:flex-row md:justify-between">
            <div className="flex flex-col items-center">
               <h1 className="text-4xl font-bold">Mis Proyectos</h1>
               <p className="text-lg text-gray-800 dark:text-gray-300">
                  <span className="text-purple-500">Adminitra</span> tus
                  proyectos
               </p>
            </div>

            <nav className="my-5">
               <Link
                  to="/projects/create"
                  className="text-white bg-purple-500 px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl"
               >
                  Nuevo Projecto
               </Link>
            </nav>
         </div>
      </>
   );
}
