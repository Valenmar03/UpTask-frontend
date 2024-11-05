import { useState } from "react";
import AddNoteForm from "./AddNoteForm";
import { PlusIcon } from "@heroicons/react/20/solid";
import {  Note } from "../../types";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Note[]
}

export default function NotesPanel({notes} : NotesPanelProps) {
   const [addNote, setAddNote] = useState(false);
   return (
      <>
        <div className="flex gap-2 w-full mt-10 items-center">
            <h3 className="text-xl ml-auto">Notas de Tarea</h3>
            <PlusIcon 
                className={`size-7 ml-auto rounded-full p-1 text-blue-700 bg-blue-200 hover:bg-blue-300 dark:text-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-950 cursor-pointer  duration-200 ${addNote && 'rotate-45 duration-100 text-red-700 bg-red-200 hover:bg-red-300 dark:text-red-300 dark:bg-red-800 dark:hover:bg-red-700'}`}
                onClick={() => setAddNote(!addNote)}
            />
        </div>
        {
            notes.length > 0 || addNote ? (
                <div className="mt-3 w-full bg-gray-300 dark:bg-neutral-900 p-2 rounded-md space-y-1 max-h-52 overflow-y-auto">
                    {addNote &&(
                        <AddNoteForm />
                    )}
                    {notes.map(note => (
                        <NoteDetail
                            key={note._id}
                            note={note}
                        />
                    ))}
                </div>
            ): (
                <p className="text-sm">No hay notas aún</p>
            )
        }
      </>
   );
}
