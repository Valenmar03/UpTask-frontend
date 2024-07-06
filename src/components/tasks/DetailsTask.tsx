import { Task } from "../../types";
import { PencilIcon } from "@heroicons/react/20/solid";

type statusTranslations = {
  name: string;
  bgColor: string;
  textColor: string;
};

const statusTranslations: { [key: string]: statusTranslations } = {
  pending: {
     name: "Pendiente",
     bgColor: "bg-neutral-700",
     textColor: "text-neutral-200",
  },
  onHold: {
     name: "En Espera",
     bgColor: "bg-red-700",
     textColor: "text-red-400",
  },
  inProgress: {
     name: "En Progreso",
     bgColor: "bg-blue-600",
     textColor: "text-blue-400",
  },
  underReview: {
     name: "En Revision",
     bgColor: "bg-orange-500",
     textColor: "text-orange-300",
  },
  completed: {
     name: "Completada",
     bgColor: "bg-green-600",
     textColor: "text-green-400",
  },
};

export default function DetailsTask({ data, status }: { data: Task, status: string }) {

   return (
      <>
         <h2 className="text-4xl font-bold px-10 group flex flex-col sm:flex-row sm:items-center mb-1">
          {data.name}
          <PencilIcon
            className="size-6 sm:invisible group-hover:visible ml-2 text-purple-600 cursor-pointer"
          />
         </h2>
         <p className={`my-3 ml-10 ${statusTranslations[status].bgColor} inline bg-opacity-60 opacity-80 py-1 px-2 rounded-xl text-xs`}>
            <span className={`${statusTranslations[status].textColor}`}>{" " + statusTranslations[status].name}</span>
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
