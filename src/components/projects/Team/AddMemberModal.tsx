import AddMemberForm from "./AddMemberForm";

export default function AddMemberModal() {
   return (
      <>
         <h2 className="text-4xl font-bold px-10 mt-5">
            Agregar <span className="text-purple-600">Colaborador</span>
         </h2>
         <p className="my-3 px-10">
            Busca por email y agregar un
            <span className="text-purple-500"> colaborador al equipo</span>
         </p>
         <AddMemberForm/>
      </>
   );
}
