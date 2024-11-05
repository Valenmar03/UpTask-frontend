import { Note } from "../../types";
import { formatDate } from "../../utils/utils";

export default function NoteDetail({ note }:  {note: Note}) {
  return (
    <div className="bg-gray-200 dark:bg-neutral-800 rounded-md py-2 pl-2">
      <p className="text-lg">
        {note.content}
      </p>
      <p className="text-sm text-neutral-400">
        {note.createdBy.name} - {' '}
        <span>{formatDate(note.createdAt)}</span>
      </p>
    </div>
  )
}
