export default function ProjectsItemsLoading() {
   return (
      <li className="px-5 py-8 shadow-xl bg-white dark:bg-neutral-700 dark:shadow-neutral-900 flex justify-between group relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-neutral-600 hover:shadow-lg before:animate-[shimmer_3s_infinite] overflow-hidden">
         <div className="flex flex-col w-full space-y-3 ">
            <div className="p-4 bg-neutral-500 rounded-full w-1/3 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-neutral-300 hover:shadow-lg before:animate-[shimmer_3s_infinite] overflow-hidden"></div>
            <div className="space-y-2">
               <div className="bg-neutral-700 dark:bg-neutral-400 rounded-full p-2 w-1/2 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white hover:shadow-lg before:animate-[shimmer_2s_infinite] overflow-hidden"></div>
               <div className="bg-neutral-700 dark:bg-neutral-400 rounded-full p-2 w-1/2 relative before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white hover:shadow-lg before:animate-[shimmer_2s_infinite] overflow-hidden"></div>
            </div>
         </div>
      </li>
   );
}
