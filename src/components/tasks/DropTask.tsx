import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string;
}

export default function DropTask({ status }: DropTaskProps) {

  const { isOver, setNodeRef } = useDroppable({
    id: status,
  })
  return (
    <div 
        ref={setNodeRef}
        className="border rounded-md p-2 text-center my-3 w-4/5 mx-auto"
    >
      Soltar Tarea aquí
    </div>
  )
}
