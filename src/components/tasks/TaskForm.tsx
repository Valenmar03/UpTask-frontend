import { UseFormRegister, FieldErrors } from "react-hook-form";
import { useEffect, useState } from "react";
import ErrorMessage from "../ErrorMessage";
import { TaskFormData } from "../../types";

type TaskFormProps = {
   register: UseFormRegister<TaskFormData>;
   errors: FieldErrors<TaskFormData>;
};

export default function TaskForm({ register, errors }: TaskFormProps) {
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
            <label htmlFor="name" className="text-lg block">
               Nombre de la Tarea
            </label>
            <input
               type="text"
               id="name"
               className={`w-full p-3  border border-gray-200 rounded bg-gray-200 text-black ${
                  Object.keys(errors).includes("name") &&
                  " border-l-4 border-l-red-500"
               }`}
               placeholder="Nombre de la Tarea"
               {...register("name", {
                  required: "El Nombre de la tarea es obligatorio",
               })}
            />
         </div>
         <div className="mb-5 space-y-3">
            <label htmlFor="description" className="text-lg block">
               Descripcion de la Tarea
            </label>
            <textarea
               id="description"
               className={`w-full p-3 border border-gray-200 rounded bg-gray-200 text-black max-h-36 min-h-24${
                  Object.keys(errors).includes("description") &&
                  " border-l-4 border-l-red-500"
               }`}
               placeholder="Descripcion de la Tarea"
               {...register("description", {
                  required: "La tarea debe tener descripcion",
               })}
            />
         </div>
      </>
   );
}
