import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type TableComponentProps = {
    data: []
}

export default function TableComponent({ data }: TableComponentProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Apellido Paterno</TableHead>
                    <TableHead>Apellido Materno</TableHead>
                    <TableHead>Fecha de Nacimiento</TableHead>
                    <TableHead>Télefono</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {(data.length == 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                            Sin registros
                        </TableCell>
                    </TableRow>
                ) :
                    <TableRow>
                        {/* <TableCell className="font-medium">INV001</TableCell> */}

                    </TableRow>
                )}
            </TableBody>
        </Table>

    )
}
