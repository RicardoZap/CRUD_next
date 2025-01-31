import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { User } from "@prisma/client"
import { Button } from "../ui/button"

type TableComponentProps = {
    data: User[]
}

export default function TableComponent({ data }: TableComponentProps) {
    return (
        <div className="w-full max-w-5xl mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
            <Table className="w-full border-collapse border border-gray-200">
                <TableHeader className="bg-gray-100">
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
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                                Sin registros
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((user) => (
                            <TableRow key={user.id} className="hover:bg-gray-50 odd:bg-gray-50 even:bg-white">
                                <TableCell className="px-4 py-2 border border-gray-300 font-medium">{user.name}</TableCell>
                                <TableCell className="px-4 py-2 border border-gray-300">{user.ap_paterno}</TableCell>
                                <TableCell className="px-4 py-2 border border-gray-300">{user.ap_materno}</TableCell>
                                <TableCell className="px-4 py-2 border border-gray-300">
                                    {user.birthday_date ? user.birthday_date.toString() : "N/A"}
                                </TableCell>
                                <TableCell className="px-4 py-2 border border-gray-300">{user.cellphone}</TableCell>
                                <TableCell className="px-4 py-2 border border-gray-300">{user.email}</TableCell>
                                <TableCell className="px-4 py-2 border border-gray-300">
                                    <div className="flex flex-row gap-3">
                                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" >Editar</Button>
                                        <Button className="bg-red-500 hover:bg-red-600 text-white" variant="destructive">Eliminar</Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
