"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { Assignment } from "@prisma/client";

type TableAssignmentComponentProps = {
  data: Assignment[]
}

export default function TableAssignmentComponent({data} : TableAssignmentComponentProps) {
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
            relations.map((enterprise) => (
              <TableRow key={enterprise.id}>
                <TableCell className="py-4">{enterprise.enterpriseId}</TableCell>
                <TableCell className="py-4">{enterprise.name}</TableCell>
                <TableCell className="py-4">{enterprise.userId}</TableCell>
                <TableCell className="flex space-x-2">
                  <Button className="bg-yellow-500 hover:bg-yellow-600">Editar</Button>
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
