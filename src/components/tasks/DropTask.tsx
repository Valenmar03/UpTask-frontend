import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string;
}

export default function DropTask({ status }: DropTaskProps) {

  const { isOver, setNodeRef } = useDroppable({
    id: status,
  })

  const style = {
    opacity: isOver ? 0.4 : undefined,
  }

  return (
    <div 
        ref={setNodeRef}
        style={style}
        className="border rounded-md p-2 text-center my-3 w-4/5 mx-auto opacity-80"
    >
      Soltar Tarea aquí
    </div>
  )
}
