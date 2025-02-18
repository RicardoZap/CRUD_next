"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteEnterprise(id: number){
    await prisma.enterprise.delete({
        where: {
            id
        }
    })
    revalidatePath('/enterprises')
}