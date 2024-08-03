import { useState } from "react";
import NewPasswordToken from "../../components/auth/NewPasswordToken";
import NewPasswordForm from "../../components/auth/NewPasswordForm";

export default function NewPasswordView() {
   const [isValidToken, setIsValidToken] = useState(false);

   return (
      <>
         <h1 className="text-3xl font-black px-10 mt-5">Cambiar contraseña</h1>
         <p className=" font-light px-10">
            Ingresa el codigo que recibiste {""}
            <span className=" text-purple-500 font-bold">por email</span>
         </p>
         {!isValidToken ? <NewPasswordToken /> : <NewPasswordForm />}
      </>
   );
}
