import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import ErrorMessage from "../../ErrorMessage";
import { TeamMemberForm } from "../../../types";
import { findUserByEmail } from "../../../api/TeamAPI";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
   const initialValues: TeamMemberForm = {
      email: "",
   };
   const [allFieldsFill, setAllFieldsFill] = useState(true);

   const params = useParams();
   const projectId = params.projectId!;

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm({ defaultValues: initialValues });

   const mutation = useMutation({
      mutationFn: findUserByEmail,

   });

   const handleSearchUser = async (formData: TeamMemberForm) => {
      const data = {
         projectId,
         formData
      }
      mutation.mutate(data);
   };

   const resetData = () => {
      reset(),
      mutation.reset()
   }

   useEffect(() => {
      if (errors.email?.type === 'required') {
         setAllFieldsFill(false);
         return;
      }
      setAllFieldsFill(true);
   }, [errors.email]);
   
   return (
      <>
         <form
            className=" my-5 px-10 rounded-md max-w-3xl mx-auto space-y-5"
            onSubmit={handleSubmit(handleSearchUser)}
            noValidate
         >
            {!allFieldsFill && (
               <ErrorMessage>Todos los campos son Obligatorios</ErrorMessage>
            )}
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
            <input
               type="submit"
               value="Buscar Colaborador"
               className="text-white bg-purple-500 mx-auto block px-8 py-3 rounded-md hover:bg-purple-600 duration-200 text-lg cursor-pointer"
            />
         </form>

         <div className="my-8">
            {mutation.isPending && <p className="text-center">Cargando...</p>}
            {mutation.error && <p className="text-center">{mutation.error.message === 'User not found' && 'Usuario no encontrado'}</p>}
            {mutation.data && <SearchResult user={mutation.data.data} reset={resetData}/>}
         </div>
      </>
   );
}
