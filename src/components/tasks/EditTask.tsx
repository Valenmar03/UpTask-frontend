import { Task } from "../../types";
import StatusBadge from "./StatusBadge";

type EditTaskProps = {
    data: Task;
}

export default function EditTask({data} : EditTaskProps) {
   return (
      <form>
         <input type="text" className=" bg-gray-300 dark:bg-neutral-700 rounded text-4xl font-bold mx-10 group flex flex-col sm:flex-row sm:items-center mb-1"/>
         <StatusBadge
            status={data.status}
         />
         <div className="px-10 mt-10">
            <h3 className="text-xl group flex items-center">Descripcion</h3>
            <p>{data.description}</p>
         </div>
      </form>
   );
}
