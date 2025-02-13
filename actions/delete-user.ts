"use server"

import prisma from "@/lib/prisma"

export async function deleteUser(id: number) {
    return prisma.user.delete({
        where: {
            id
        }
    })
}