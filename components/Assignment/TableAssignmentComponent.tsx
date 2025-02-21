"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { AssignmentWithRelations } from "@/src/types";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";
import { mutate } from "swr";
import { deleteAssignment } from "@/actions/assignment/delete-assignment";

type TableAssignmentComponentProps = {
  data: AssignmentWithRelations[]
}

function handleEdit(id: number) {
  redirect(`/assignment/${id}/edit`)
}

async function handleDelete(id: number) {
  await deleteAssignment(id)
  toast.success("Asignación Eliminada Correctamente")
  mutate("/assignment/api")
}

export default function TableAssignmentComponent({ data }: TableAssignmentComponentProps) {
  const relations = data
  return (
    <div className="w-full max-w-full my-8 shadow-lg rounded-lg">
      <Table className="w-full border-collapse border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="px-4 py-2 border border-gray-300">Empresa</TableHead>
            <TableHead className="px-4 py-2 border border-gray-300">Usuario</TableHead>
            <TableHead className="px-4 py-2 border border-gray-300">Cargo</TableHead>
            <TableHead className="px-4 py-2 border border-gray-300">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {relations.length > 0 ? (
            relations.map((relation) => (
              <TableRow key={relation.id}>
                <TableCell className="py-4">{`${relation.user.name} ${relation.user.ap_paterno} ${relation.user.ap_materno}`}</TableCell>
                <TableCell className="py-4">{relation.enterprise.name}</TableCell>
                <TableCell className="py-4">{relation.rol.rol_name}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={() => handleEdit(relation.id)}>Editar</Button>
                  <Button variant="destructive" onClick={() => handleDelete(relation.id)}>Eliminar</Button>
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
