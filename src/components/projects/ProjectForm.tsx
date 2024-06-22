import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { ProjectFormData } from "../../types";

type ProjectFormProps = {
   register: UseFormRegister<ProjectFormData>;
   errors: FieldErrors<ProjectFormData>;
};

export default function ProjectForm({ register, errors }: ProjectFormProps) {
   const [allFieldsFill, setAllFieldsFill] = useState(true);

   useEffect(() => {
      if (Object.keys(errors).length > 0) {
         setAllFieldsFill(false);
         return;
      }
      setAllFieldsFill(true);
   }, [errors]);

   return (
      <>
         {!allFieldsFill && (
            <ErrorMessage>Todos los campos son Obligatorios</ErrorMessage>
         )}
         <div className="mb-5 space-y-3">
            <label htmlFor="projectName" className="text-lg">
               Nombre del Proyecto
            </label>
            <input
               id="projectName"
               className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black 
                  ${
                     Object.keys(errors).includes("projectName") &&
                     " border-l-4 border-l-red-500"
                  }`}
               type="text"
               placeholder="Nombre del Proyecto"
               {...register("projectName", {
                  required: "El Titulo del Proyecto es obligatorio",
               })}
            />
         </div>

         <div className="mb-5 space-y-3">
            <label htmlFor="clientName" className="text-lg">
               Nombre Cliente
            </label>
            <input
               id="clientName"
               className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black ${
                  Object.keys(errors).includes("clientName") &&
                  " border-l-4 border-l-red-500"
               }`}
               type="text"
               placeholder="Nombre del Cliente"
               {...register("clientName", {
                  required: "El Nombre del Cliente es obligatorio",
               })}
            />
         </div>

         <div className="mb-5 space-y-3">
            <label htmlFor="description" className="text-lg">
               Descripción
            </label>
            <textarea
               id="description"
               className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black max-h-36 min-h-24 ${
                  Object.keys(errors).includes("description") &&
                  " border-l-4 border-l-red-500"
               }`}
               placeholder="Descripción del Proyecto"
               {...register("description", {
                  required: "Una descripción del proyecto es obligatoria",
               })}
            />
         </div>
      </>
   );
}
