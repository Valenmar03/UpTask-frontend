import { useForm } from "react-hook-form"
import { RequestConfirmationCodeForm } from "../../types"
import { Link } from "react-router-dom"

export default function RequestNewCodeView() {
  const initialValues: RequestConfirmationCodeForm = {
    email: ''
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues })

  const handleRequestCode = (formData : RequestConfirmationCodeForm) => {

  }

  return (
    <>
         <h1 className="text-3xl font-black ">Solicitar nuevo código</h1>
         <p className=" font-light ">
            Ingresa tu correo y recibirás un {""}
            <span className=" text-purple-500 font-bold"> nuevo código</span>
         </p>
         <form className="space-y-3 px-10 py-4">
            <label className="font-normal text-lg block" htmlFor="email" >
              Email
            </label>
            <input id="email" type="text" placeholder="example@email.com" 
              className="w-full p-3  border border-gray-200 rounded bg-gray-200 text-black"
            />
            
         </form>

         <nav className=" flex flex-col space-y-2 text-center mt-3">
            <p className="text-sm">
               ¿Ya tienes cuenta? {' '}
               <Link to="/auth/login" className="text-purple-500">Iniciar Sesión</Link>
            </p>
            <p className="text-sm">
               ¿Olvidaste tu contraseña? {' '}
               <Link to="/auth/request-new-code" className="text-purple-500">Reestablecer</Link>
            </p>
         </nav>
      </>
  )
}
