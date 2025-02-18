"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Rol } from "@prisma/client";
import { format } from "date-fns"
import { useRouter } from "next/navigation"

type TableRolComponentProps = {
  data: Rol[]
}


export default function TableRolComponent({ data }: TableRolComponentProps) {
  const roles = data
  const router = useRouter()

  function handleEdit(id: number) {
    router.push(`/roles/${id}/edit`)
  }

  /* async function handleDelete(id: number) {
    await deleteEnterprise(id)
    toast.success("Empresa Eliminada Correctamente")
    mutate("/enterprises/api")
  } */

  return (
    <div className="w-full max-w-full my-8 shadow-lg rounded-lg">
      <Table className="w-full border-collapse border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border border-gray-300">Cargo</TableHead>
            <TableHead className="px-4 py-2 border border-gray-300">Fecha Creación</TableHead>
            <TableHead className="px-4 py-2 border border-gray-300">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.length > 0 ? (
            roles.map((rol) => (
              <TableRow key={rol.id} className="ml-5">
                <TableCell className="px-6">{rol.rol_name}</TableCell>
                <TableCell className="px-4">{rol.createdAt.toString() ? format(rol.createdAt, "dd-MM-yyyy") : "N/A"}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={() => handleEdit(rol.id)}>Editar</Button>
                  <Button variant="destructive">Eliminar</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                Sin registros
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
