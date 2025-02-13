"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import { useDialogStore, useUserStore } from "@/src/store";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useSortable, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { format } from "date-fns"

type TableComponentProps = {
    data: User[]
}

export default function TableComponent({ data }: TableComponentProps) {
    const { isEditUser } = useDialogStore()
    const { removeUser } = useUserStore()
    const { users, setUsers } = useUserStore();
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
        setUsers(data); // Asegura que los datos iniciales sean correctos
    }, []);

    if (!isHydrated) return null;

    const handleDragEnd = (event: any) => {
        const { active, over } = event
        if (!over || active.id === over.id) return

        const oldIndex = users.findIndex((user) => user.id === active.id)
        const newIndex = users.findIndex((user) => user.id === over.id)

        // Reordenar el array
        const updatedUsers = [...users]
        const [movedUser] = updatedUsers.splice(oldIndex, 1)
        updatedUsers.splice(newIndex, 0, movedUser)

        setUsers(updatedUsers) // Actualizar el estado con el nuevo orden
    }

    return (
        <div className=" w-full max-w-full my-8 shadow-lg rounded-lg">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
                            {users.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4 text-gray-500">
                                        Sin registros
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((user) => <SortableRow key={user!.id} user={user} isEditUser={isEditUser} removeUser={removeUser} />)
                            )}
                        </TableBody>
                    </SortableContext>
                </Table>
            </DndContext>
        </div>
    )
}

// Componente para cada fila reordenable
function SortableRow({ user, isEditUser, removeUser }: { user: User; isEditUser: any; removeUser: any }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: user.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <TableRow
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="cursor-grab hover:bg-gray-50 hover:text-black"
        >
            <TableCell className="px-4 py-2 border border-gray-300 font-medium">{user.name}</TableCell>
            <TableCell className="px-4 py-2 border border-gray-300">{user.ap_paterno}</TableCell>
            <TableCell className="px-4 py-2 border border-gray-300">{user.ap_materno}</TableCell>
            <TableCell className="px-4 py-2 border border-gray-300">{user.birthday_date ? format(user.birthday_date, "dd-MM-yyyy") : "N/A"}</TableCell>
            <TableCell className="px-4 py-2 border border-gray-300">{user.cellphone}</TableCell>
            <TableCell className="px-4 py-2 border border-gray-300">{user.email}</TableCell>
            <TableCell className="px-4 py-2 border border-gray-300">
                <div className="flex flex-row gap-3">
                    <Button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        onClick={() => isEditUser(user, true)}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        Editar
                    </Button>
                    <Button
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => removeUser(user.id)}
                        onPointerDown={(e) => e.stopPropagation()}
                    >
                        Eliminar
                    </Button>
                </div>
            </TableCell>
        </TableRow>
    )
}
