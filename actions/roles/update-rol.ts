"use server"

import prisma from "@/lib/prisma"
import { CreateRolSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function updateEnterprise(id: number, data: z.infer<typeof CreateRolSchema>) {
    const result = CreateRolSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.rol.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/roles')
}