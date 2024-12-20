import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import { ChevronRightIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Note, Project } from "../../types";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
   notes: Note[];
   projectManager: Project['manager']
};

export default function NotesPanel({ notes, projectManager }: NotesPanelProps) {
   const [addNote, setAddNote] = useState(false);
   const [isNotesExpanded, setIsNotesExpanded] = useState(true);

   return (
      <>
         <div className={`flex gap-2 w-full mt-10 items-center`}>
            <ChevronRightIcon
               className={`size-6 cursor-pointer ${
                  isNotesExpanded && "rotate-90"
               } duration-100`}
               onClick={() => {
                  setIsNotesExpanded(!isNotesExpanded)
                  setAddNote(false);
               }}

            />
            <h3 className="text-xl ml-auto">Notas de Tarea</h3>
            <PlusIcon
               className={`size-7 ml-auto rounded-full p-1 text-blue-700 bg-blue-200 hover:bg-blue-300 dark:text-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-950 cursor-pointer  duration-200 ${
                  addNote &&
                  "rotate-45 duration-100 text-red-700 bg-red-200 hover:bg-red-300 dark:text-red-300 dark:bg-red-800 dark:hover:bg-red-700"
               }`}
               onClick={() => {
                  setAddNote(!addNote);
                  setIsNotesExpanded(true);
               }}
            />
         </div>
         {isNotesExpanded &&
            (notes.length > 0 || addNote ? (
               <div className="mt-3 w-full bg-gray-300 dark:bg-neutral-900 p-2 rounded-md space-y-1 max-h-52 overflow-y-auto">
                  {addNote && <AddNoteForm />}
                  {notes
                     .slice()
                     .reverse()
                     .map((note) => (
                        <NoteDetail key={note._id} note={note} projectManager={projectManager} />
                     ))}
               </div>
            ) : (
               <p className="text-sm text-center mt-5">No hay notas aún</p>
            ))}
      </>
   );
}
