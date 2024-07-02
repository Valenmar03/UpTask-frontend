import { Task } from "../../types"

export default function DetailsTask({ data } : { data: Task }) {

  return (
    <div>
      <h2>
        {data.name}
      </h2>
    </div>
  )
}
