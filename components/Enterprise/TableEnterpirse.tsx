"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Enterprise } from "@prisma/client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { deleteEnterprise } from "@/actions/enterprise/delete-enterprises";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useSWRConfig } from "swr";

type TableComponentProps = {
    data: Enterprise[]
}

export default function TableEnterprise({ data }: TableComponentProps) {
    const enterprises = data
    const router = useRouter()
    const { mutate } = useSWRConfig()
    
    function handleEdit(id : number){
        router.push(`/enterprises/${id}/edit`)
    }

    async function handleDelete(id : number){
        await deleteEnterprise(id)
        toast.success("Empresa Eliminada Correctamente")
        mutate("/enterprises/api")
    }

    return (
        <div className="w-full max-w-full my-8 shadow-lg rounded-lg">
            <Table className="w-full border-collapse border border-gray-200">
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-2 border border-gray-300">Nombre</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Dirección</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Teléfono</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Email</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {enterprises.length > 0 ? (
                        enterprises.map((enterprise) => (
                            <TableRow key={enterprise.id}>
                                <TableCell className="py-4">{enterprise.name}</TableCell>
                                <TableCell className="py-4">{enterprise.address}</TableCell>
                                <TableCell className="py-4">{enterprise.cellphone}</TableCell>
                                <TableCell className="py-4">{enterprise.email}</TableCell>
                                <TableCell className="flex space-x-2">
                                    <Button onClick={() => handleEdit(enterprise.id)} className="bg-yellow-500 hover:bg-yellow-600">Editar</Button>
                                    <Button onClick={() => handleDelete(enterprise.id)} variant="destructive">Eliminar</Button>
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
