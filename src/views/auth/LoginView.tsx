import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserLoginForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { logIn } from "../../api/AuthAPI";

export default function LoginView() {
   const [allFieldsFill, setAllFieldsFill] = useState(true);

   const navigate = useNavigate()

   const initialValues: UserLoginForm = {
      email: "",
      password: "",
   };
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const { mutate } = useMutation({
      mutationFn: logIn,
      onError: (error) => {
         error.message === "User not found" &&
            toast.error("El usuario no existe");
         error.message ===
            "User is not confirmed, check your email to confirm the account" &&
            toast.error(
               "El usuario no esta confirmado, enviamos un codigo de confirmacion a tu correo. Puedes cerrar esta ventana"
            );
         error.message === "Password is not correct" &&
            toast.error("Contraseña Incorrecta");
      },
      onSuccess: () => {
         setTimeout(() => {
            navigate('/')
         }, 1500);
      },
   });

   const handleLogin = (formData: UserLoginForm) => mutate(formData);

   useEffect(() => {
      if (
         errors.email?.type === "required" ||
         errors.password?.type === "required"
      ) {
         setAllFieldsFill(false);
         return;
      }
      setAllFieldsFill(true);
   }, [errors.email, errors.password]);

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
                  <label className="font-normal text-xl" htmlFor="email">
                     Email
                  </label>
                  <input
                     id="email"
                     type="email"
                     placeholder="example@email.com"
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
                  {errors.email?.type === "pattern" && (
                     <p className="text-red-500 text-sm">Email no válido</p>
                  )}
               </div>

               <div className="flex flex-col gap-3">
                  <label className="font-normal text-xl">Password</label>

                  <input
                     type="password"
                     placeholder="Contraseña"
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

         <nav className="flex flex-col text-center px-10">
            <p className="text-sm">
               ¿No tienes cuenta?{" "}
               <Link to={"/auth/register"} className="text-purple-500">
                  Crea una aquí
               </Link>
            </p>
            <p className="text-sm">
               ¿Olvidaste tu contraseña?{" "}
               <Link to={"/auth/forgot-password"} className="text-purple-500">
                  Reestablecer
               </Link>
            </p>
         </nav>
      </>
   );
}
