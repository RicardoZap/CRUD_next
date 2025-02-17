import EnterpriseForm from "@/components/Enterprise/EnterpriseForm"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

async function getProductById(id: number) {
    const enterprise = await prisma.enterprise.findUnique({
        where: {
            id
        }
    })
    if (!enterprise) {
        notFound()
    }

    return enterprise
}

export default async function EditProductsPage({ params }: { params: { id: string } }) {
    const { id } = params
    const enterprise = await getProductById(parseInt(id))

    return (
        <>
            <EnterpriseForm
                data={enterprise}
            />
        </>
    )
}

