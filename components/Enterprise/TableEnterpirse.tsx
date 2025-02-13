"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Enterprise } from "@prisma/client";
import { Button } from "../ui/button";
import { useDialogStore, useUserStore } from "@/src/store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { format } from "date-fns"

type TableComponentProps = {
    data: Enterprise[]
}

export default function TableEnterprise({ data }: TableComponentProps) {
    const users = data

    return (
        <div className=" w-full max-w-full my-8 shadow-lg rounded-lg">
            <Table className="w-full border-collapse border border-gray-200">
                <TableHeader>
                    <TableRow>
                        <TableHead className="px-4 py-2 border border-gray-300">Nombre</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Apellido Paterno</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Apellido Materno</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Fecha de Nacimiento</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Teléfono</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Email</TableHead>
                        <TableHead className="px-4 py-2 border border-gray-300">Acciones</TableHead>
                    </TableRow>
                </TableHeader>

                <SortableContext items={users.map((user) => user.id)} strategy={verticalListSortingStrategy}>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                Sin registros
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </SortableContext>
            </Table>
        </div>
    )
}


