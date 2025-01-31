"use server"
import prisma from "@/lib/prisma"

export async function GET() {
    const result = await prisma.user.findMany()

    return Response.json(result)
}