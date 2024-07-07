import { Task } from "../../types";

type statusTranslations = {
    name: string;
    bgColor: string;
    textColor: string;
};
type EditTaskProps = {
    data: Task;
    statusTranslations: {[key: string]: statusTranslations};
}

export default function EditTask({data, statusTranslations} : EditTaskProps) {

   const theme = localStorage.getItem('theme');
   console.log(theme)
   return (
      <form>
         <input type="text" className=" bg-gray-300 dark:bg-neutral-700 rounded text-4xl font-bold mx-10 group flex flex-col sm:flex-row sm:items-center mb-1"/>
         <p
            className={`my-3 ml-10 ${
               statusTranslations[data.status].bgColor
            } inline bg-opacity-60 opacity-80 py-1 px-2 rounded-xl text-xs`}
         >
            <span className={`${statusTranslations[data.status].textColor}`}>
               {" " + statusTranslations[data.status].name}
            </span>
         </p>
         <div className="px-10 mt-10">
            <h3 className="text-xl group flex items-center">Descripcion</h3>
            <p>{data.description}</p>
         </div>
      </form>
   );
}
