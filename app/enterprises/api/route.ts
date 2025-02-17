"use server"
import prisma from "@/lib/prisma"

export async function GET() {
    const result = await prisma.enterprise.findMany()

    return Response.json(result)
}