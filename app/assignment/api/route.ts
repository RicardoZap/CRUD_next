"use server"
import prisma from "@/lib/prisma"

export async function GET() {
    const result = await prisma.assignment.findMany({
        include: {
            user: {
                select: {
                    name: true,
                    ap_paterno: true,
                    ap_materno: true
                }
            },
            enterprise: {
                select: {
                    name: true
                }
            },
            rol: {
                select: {
                    rol_name: true
                }
            }
        }
    })

    return Response.json(result)
}