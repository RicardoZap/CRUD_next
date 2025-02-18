import EnterpriseForm from "@/components/Enterprise/EnterpriseForm"
import RolForm from "@/components/Roles/RolForm"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const rol = await prisma.rol.findUnique({
        where: {
            id
        }
    })
    if (!rol) {
        notFound()
    }

    return rol
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {
    const { id } = params
    const rol = await getProductById(parseInt(id))

    return (
        <>
            <RolForm
                data={rol}
            />
        </>
    )
}

