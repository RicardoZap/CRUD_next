"use server"

import prisma from "@/lib/prisma"
import { CreateEnterpriseSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function updateEnterprise(id: number, data: z.infer<typeof CreateEnterpriseSchema>) {
    const result = CreateEnterpriseSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.enterprise.update({
        where: {
            id
        },
        data: result.data
    })
    revalidatePath('/enterprises')
}