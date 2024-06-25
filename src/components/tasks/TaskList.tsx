import { Task } from "../../types"

type TaskListProps = {
    tasks: Task[]
}

export default function TaskList({ tasks } : TaskListProps) {
  return (
    <div>
      TaskList
    </div>
  )
}
