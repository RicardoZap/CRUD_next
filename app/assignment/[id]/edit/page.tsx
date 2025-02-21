import AssignmentForm from "@/components/Assignment/AssignmentForm"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getAssingmentById(id: number) {
    const assignment = await prisma.assignment.findUnique({
        where: {
            id
        }
    })
    if (!assignment) {
        notFound()
    }

    return assignment
}

export default async function EditAssingmentPage({ params }: { params: { id: string } }) {
    const { id } = params
    const assignment = await getAssingmentById(parseInt(id))

    return (
        <>
            <AssignmentForm
                data={assignment}
            />
        </>
    )
}