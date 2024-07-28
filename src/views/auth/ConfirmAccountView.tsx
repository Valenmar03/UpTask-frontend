import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('')

    const navigate = useNavigate()

   const { mutate } = useMutation({
      mutationFn: confirmAccount,
      onError: (error) => {
         error.message === 'Invalid Token' &&
         toast.error('El Token no es válido')
      }, 
      onSuccess: (data) => {
         data === 'Account confirmed' &&
         toast.success('Cuenta confirmada. Redireccionando...')
         setTimeout(() => {
            navigate('/auth/login')
         }, 3000);
      }
   })

    const handleChange = (token: ConfirmToken['token']) => {
        setToken(token);
    }

    const handleComplete = (token: ConfirmToken['token']) => mutate({token})

   return (
      <>
         <h1 className="text-3xl font-black ">Confirma tu Cuenta</h1>
         <p className=" font-light ">
            Ingresa el código que recibiste {""}
            <span className=" text-purple-500 font-bold"> por e-mail</span>
         </p>
         <form className="space-y-3 px-10 py-4">
            <label className="font-normal text-lg text-center block">
               Código de 6 dígitos
            </label>
            <div className="flex justify-center gap-5 text-black">
                <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                    <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100"/>
                    <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100"/>
                    <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100"/>
                    <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100"/>
                    <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100"/>
                    <PinInputField className="w-12 h-12 rounded-md text-center bg-gray-300 dark:bg-gray-100 border-gray-300 p-3 placeholder-gray-300 dark:placeholder-gray-100"/>
                </PinInput>
            </div>
         </form>

         <nav className=" flex flex-col space-y-4 text-center">
         <p className="text-sm">
               ¿El código expiró? {' '}
               <Link to="/auth/new-code" className="text-purple-500">Reenviar Código</Link>
            </p>
         </nav>
      </>
   );
}
