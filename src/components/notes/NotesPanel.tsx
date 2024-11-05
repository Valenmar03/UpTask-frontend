import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import { PlusIcon } from "@heroicons/react/20/solid";

export default function NotesPanel() {
   const [addNote, setAddNote] = useState(false);
   return (
      <>
      <div className="flex gap-2 w-1/3 mt-10 items-center">
        <h3 className="text-xl">Notas de Tarea</h3>
        <PlusIcon 
            className={`size-7 rounded-full p-1 text-blue-700 bg-blue-200 hover:bg-blue-300 dark:text-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-950 cursor-pointer  duration-200 ${addNote && 'rotate-45 duration-100 text-red-700 bg-red-200 hover:bg-red-300 dark:text-red-300 dark:bg-red-800 dark:hover:bg-red-700'}`}
            onClick={() => setAddNote(!addNote)}
        />
      </div>
         <div className="mt-3 w-1/2">
            {addNote &&(
               <AddNoteForm />
            )}
         </div>
      </>
   );
}
