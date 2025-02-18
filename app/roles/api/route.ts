"use server"
import prisma from "@/lib/prisma"

export async function GET() {
    const result = await prisma.rol.findMany()

    return Response.json(result)
}