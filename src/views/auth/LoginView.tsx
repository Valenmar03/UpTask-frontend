import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";

export default function LoginView() {
   const [allFieldsFill, setAllFieldsFill] = useState(true);

   const initialValues: UserLoginForm = {
      email: "",
      password: "",
   };
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   useEffect(() => {
      if (Object.keys(errors).length > 0) {
         setAllFieldsFill(false);
         return;
      }
      setAllFieldsFill(true);
   }, [errors]);

   const handleLogin = (formData: UserLoginForm) => {};

   return (
      <>
         <form
            onSubmit={handleSubmit(handleLogin)}
            className="space-y-7 px-10 py-4"
            noValidate
         >
            {!allFieldsFill && (
               <ErrorMessage>Todos los campos son Obligatorios</ErrorMessage>
            )}
            <div className="space-y-5">
               <div className="flex flex-col gap-3">
                  <label className="font-normal text-xl">Email</label>

                  <input
                     id="email"
                     type="email"
                     placeholder="Email de Registro"
                     className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black 
              ${
                 Object.keys(errors).includes("email") &&
                 " border-l-4 border-l-red-500"
              }`}
                     {...register("email", {
                        required: "El Email es obligatorio",
                        pattern: {
                           value: /\S+@\S+\.\S+/,
                           message: "E-mail no válido",
                        },
                     })}
                  />
               </div>

               <div className="flex flex-col gap-3">
                  <label className="font-normal text-xl">Password</label>

                  <input
                     type="password"
                     placeholder="Password de Registro"
                     className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black 
              ${
                 Object.keys(errors).includes("password") &&
                 " border-l-4 border-l-red-500"
              }`}
                     {...register("password", {
                        required: "El Password es obligatorio",
                     })}
                  />
               </div>
            </div>

            <input
               type="submit"
               value="Iniciar Sesión"
               className="text-white bg-purple-500 w-full block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl cursor-pointer"
            />
         </form>

         <nav className="flex flex-col space-y-4 px-10">
            <p className="text-sm">
               ¿No tienes cuenta? {' '}
               <Link to={"/auth/register"} className="text-purple-500">Crea una aquí</Link>
            </p>
         </nav>
      </>
   );
}
