"use server"

import prisma from "@/lib/prisma"
import { CreateAssignmentSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function updateAssignment(id: number, data: z.infer<typeof CreateAssignmentSchema>) {
    const result = CreateAssignmentSchema.safeParse(data)
    const { rolId, userId, enterpriseId } = data
    const rol = Number(rolId)
    const user = Number(userId)
    const enterprise = Number(enterpriseId)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    await prisma.assignment.update({
        where: {
            id
        },
        data: {
            rolId: rol,
            enterpriseId: enterprise,
            userId: user
        }
    })
    revalidatePath('/enterprises')
}