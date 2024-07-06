import { Task } from "../../types";
import { PencilIcon } from "@heroicons/react/20/solid";

type statusTranslations = {
  name: string;
  color: string;
};

const statusTranslations: { [key: string]: statusTranslations } = {
  pending: {
     name: "Pendiente",
     color: "border-b-gray-400",
  },
  onHold: {
     name: "En Espera",
     color: "border-b-red-500",
  },
  inProgress: {
     name: "En Progreso",
     color: "border-b-blue-500",
  },
  underReview: {
     name: "En Revision",
     color: "border-b-orange-400",
  },
  completed: {
     name: "Completada",
     color: "border-b-green-500",
  },
};

export default function DetailsTask({ data, status }: { data: Task, status: string }) {

   return (
      <>
         <h2 className="text-3xl font-bold px-10 group w-2/3 flex items-center">
          {data.name}
          <PencilIcon
            className="size-6 invisible group-hover:visible ml-2 text-purple-600 cursor-pointer"
          />
         </h2>
         <p className="my-3 px-10">
            <span className="text-purple-500">{" " + status}</span>
         </p>
         <div className="px-10 mt-10">
          <h3 className="text-xl group flex items-center">
            Descripcion
            <PencilIcon
            className="size-5 invisible group-hover:visible ml-2 text-purple-600 cursor-pointer"
          />
          </h3>
            <p>
              {data.description}
            </p>
         </div>
      </>
   );
}
