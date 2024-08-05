import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { NewPasswordForm as NewPasswordFormType, ValidateToken } from "../../types";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../api/AuthAPI";
import { toast } from "react-toastify";



export default function NewPasswordForm({ token } : {token: ValidateToken["token"]}) {
   const [allFieldsFill, setAllFieldsFill] = useState(false);

   const navigate = useNavigate();

   const initialValues: NewPasswordFormType = {
      password: "",
      password_confirmation: "",
   };

   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm<NewPasswordFormType>({ defaultValues: initialValues });

   const password = watch("password");

   const { mutate } = useMutation({
      mutationFn: updatePassword,
      onError: (error) => {
         error.message === "Invalid Token" && toast.error("Token inválido");
      },
      onSuccess: (data) => {
         data === "Password succesfully updated. Reditecting..." &&
            toast.success(
               "Contraseña modificada correctamente. Redirigiendo..."
            )
         setTimeout(() => {
            navigate('/auth/login')
         }, 4000)
      },
   });

   const handleUpdatePassword = (password : NewPasswordFormType) => {
      const data = {
         password, 
         token
      }
      mutate(data)
   };

   useEffect(() => {
      if (
         errors.password?.type === "required" ||
         errors.password_confirmation?.type === "required"
      ) {
         setAllFieldsFill(false);
         return;
      }
      setAllFieldsFill(true);
   }, [errors.password, errors.password_confirmation]);

   return (
      <>
         <form
            onSubmit={handleSubmit(handleUpdatePassword)}
            className="space-y-7 px-10 py-4"
            noValidate
         >
            {!allFieldsFill && (
               <ErrorMessage>Todos los campos son Obligatorios</ErrorMessage>
            )}
            <div className="space-y-3">
               <div className="flex flex-col gap-2">
                  <label className="font-normal text-xl">Password</label>

                  <input
                     type="password"
                     placeholder="Password de Registro"
                     className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black 
                   ${
                      Object.keys(errors).includes("email") &&
                      " border-l-4 border-l-red-500"
                   }`}
                     {...register("password", {
                        required: "El Password es obligatorio",
                        minLength: {
                           value: 8,
                           message:
                              "El Password debe ser mínimo de 8 caracteres",
                        },
                     })}
                  />
                  {errors.password?.message ===
                     "El Password debe ser mínimo de 8 caracteres" && (
                     <p className="text-red-500 text-sm">
                        El Password debe ser mínimo de 8 caracteres
                     </p>
                  )}
               </div>

               <div className="flex flex-col gap-2">
                  <label className="font-normal text-xl">
                     Repetir Password
                  </label>

                  <input
                     id="password_confirmation"
                     type="password"
                     placeholder="Repite Password de Registro"
                     className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black 
                   ${
                      Object.keys(errors).includes("email") &&
                      " border-l-4 border-l-red-500"
                   }`}
                     {...register("password_confirmation", {
                        required: "Repetir Password es obligatorio",
                        validate: (value) =>
                           value === password || "Los Passwords no son iguales",
                     })}
                  />
                  {errors.password_confirmation?.message ===
                     "Los Passwords no son iguales" && (
                     <p className="text-red-500 text-sm">
                        Los Passwords no son iguales
                     </p>
                  )}
               </div>
            </div>

            <input
               type="submit"
               value="Registrarme"
               className="text-white bg-purple-500 w-full block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-xl cursor-pointer"
            />
         </form>

         {/* <nav className="flex flex-col px-10 text-center">
            <p className="text-sm">
               ¿Ya tienes cuenta?{" "}
               <Link to={"/auth/login"} className="text-purple-500">
                  Iniciar sesión
               </Link>
            </p>
         </nav> */}
      </>
   );
}
