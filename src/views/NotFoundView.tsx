import { Link } from "react-router-dom";


export default function NotFoundView() {
  return (
    <>
        <h1 className="text-4xl text-center mt-10 font-bold">
            Página no encontrada...
        </h1>
        <p className="mt-5 text-center text-xl">
            Volver a {' '}
            <Link to={'/'} className="text-purple-500 hover:text-purple-400 duration-200">Proyectos</Link>
        </p>
    </>
  )
}
