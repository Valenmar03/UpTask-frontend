import { Task } from "../../types"

type TypeCardProps = {
  task: Task
}

export default function TaskCard({task} : TypeCardProps) {
  return (
    <li className="p-2 bg-gray-100 dark:bg-neutral-800">
      <div>
        <button
          className="text-lg hover:translate-x-1 hover:scale-105 duration-300"
        >
          {task.name}
        </button>
        <p className="opacity-80 text-sm w-2/3">
          {task.description}
        </p>
      </div>
    </li>
  )
}
