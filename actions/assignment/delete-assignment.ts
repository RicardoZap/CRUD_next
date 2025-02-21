"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteAssignment(id: number){
    await prisma.assignment.delete({
        where: {
            id
        }
    })
    revalidatePath('/assignment')
}