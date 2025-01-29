import FloatingActionButton from "@/components/Users/FloatingActionButton";
import TableComponent from "@/components/Users/TableComponent";

export default function UsersPage() {
  return (
    <>
        <div className="flex flex-col items-center justify-between">
            <h1 className="text-2xl font-semibold mt-5 mb-5">Listado de Usuarios</h1>
            <TableComponent 
                data={[]}
            />
            <FloatingActionButton />
        </div>
    </>
  )
}
