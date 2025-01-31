"use server"
import prisma from "@/lib/prisma"
import { User } from "@prisma/client"

export async function getUser(): Promise<User[]> {
    try {
        const result = await prisma.user.findMany()

        return result
    } catch (error) {
        console.log(error)
        return []
    }
}