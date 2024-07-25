import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { UserRegisterForm } from "../../types";
import ErrorMessage from "../../components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
   const [allFieldsFill, setAllFieldsFill] = useState(true);


   const initialValues: UserRegisterForm = {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
   };

   const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
   } = useForm<UserRegisterForm>({ defaultValues: initialValues });

   const { mutate } = useMutation({
      mutationFn: createAccount,
      onError: (error) => {
         error.message === 'User already exists' && 
         toast.error('Ya existe una cuenta con ese correo')
      },
      onSuccess: (data) => {
         toast.success(data)
         reset()
      } 
   })

   const password = watch("password");

   const handleRegister = (formData: UserRegisterForm) => mutate(formData);

   useEffect(() => {
      if (Object.keys(errors).length > 0) {
        setAllFieldsFill(false);
        return;
      }
      setAllFieldsFill(true);
   }, [errors]);


   return (
      <>
         <h1 className="text-3xl font-black">Crear Cuenta</h1>
         <p className="font-light">
            Llena el formulario para {""}
            <span className=" text-purple-500 font-bold"> crear tu cuenta</span>
         </p>

         <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-7 px-10 py-4"
            noValidate
         >
            {!allFieldsFill && (
               <ErrorMessage>Todos los campos son Obligatorios</ErrorMessage>
            )}
            <div className="space-y-3">
               <div className="flex flex-col gap-2">
                  <label className="font-normal text-xl" htmlFor="email">
                     Email
                  </label>
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
                        required: "El Email de registro es obligatorio",
                        pattern: {
                           value: /\S+@\S+\.\S+/,
                           message: "E-mail no válido",
                        },
                     })}
                  />
                  {errors.email?.message === "E-mail no válido" && (
                     <p className="text-red-500 text-sm">Email no válido</p>
                  )}
               </div>

               <div className="flex flex-col gap-2">
                  <label className="font-normal text-xl">Nombre</label>
                  <input
                     type="name"
                     placeholder="Nombre de Registro"
                     className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black 
                        ${
                           Object.keys(errors).includes("email") &&
                           " border-l-4 border-l-red-500"
                        }`}
                     {...register("name", {
                        required: "El Nombre de usuario es obligatorio",
                     })}
                  />
               </div>

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

         <nav className="flex flex-col px-10 text-center">
            <p className="text-sm">
               ¿Ya tienes cuenta? {' '}
               <Link to={"/auth/login"} className="text-purple-500">Iniciar sesión</Link>
            </p>
         </nav>
      </>
   );
}
