import { Project } from "../../types";

export default function AddTask({ data }: { data: Project }) {
   return (
      <>
         <h2 className="text-4xl font-bold">
            Nueva <span className="text-purple-600">Tarea</span>
         </h2>
         <p className="text-sm my-3">
            Agregue una tarea a{" "}
            <span className="text-purple-500">{`${data.projectName}`}</span>
         </p>
      </>
   );
}
