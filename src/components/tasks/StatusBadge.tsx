type statusTranslations = {
    name: string;
    bgColorDark: string;
    textColorDark: string;
    bgColorLight: string;
    textColorLight: string;
 };
 
 const statusTranslations: { [key: string]: statusTranslations } = {
    pending: {
       name: "Pendiente",
       bgColorDark: "bg-indigo-700",
       textColorDark: "text-indigo-200",
       bgColorLight: "bg-indigo-400",
       textColorLight: "text-indigo-600",
    },
    onHold: {
       name: "En Espera",
       bgColorDark: "bg-red-700",
       textColorDark: "text-red-300",
       bgColorLight: "bg-red-400",
       textColorLight: "text-red-800",
    },
    inProgress: {
       name: "En Progreso",
       bgColorDark: "bg-blue-700",
       textColorDark: "text-blue-300",
       bgColorLight: "bg-blue-300",
       textColorLight: "text-blue-700",
    },
    underReview: {
       name: "En Revision",
       bgColorDark: "bg-orange-600",
       textColorDark: "text-orange-300",
       bgColorLight: "bg-orange-400",
       textColorLight: "text-orange-700",
    },
    completed: {
       name: "Completada",
       bgColorDark: "bg-green-700",
       textColorDark: "text-green-300",
       bgColorLight: "bg-green-300",
       textColorLight: "text-green-700",
    },
 };

export default function StatusBadge({status} : {status: string}) {
    const theme = localStorage.getItem("theme");
  return (
    <p
                  className={`my-3 ml-10 ${theme === 'light' ?
                     statusTranslations[status].bgColorLight :
                     statusTranslations[status].bgColorDark
                  } inline bg-opacity-60 opacity-80 py-1 px-2 rounded-xl text-sm font-bold`}
               >
                  <span
                     className={`${theme === 'light' ?
                        statusTranslations[status].textColorLight :
                        statusTranslations[status].textColorDark
                     }`}
                  >
                     {" " + statusTranslations[status].name}
                  </span>
               </p>
  )
}
