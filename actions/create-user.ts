"use server"

import prisma from "@/lib/prisma"
import { CreateUserSchema } from "@/src/schema"

export async function createUser(data: unknown) {
    const result = CreateUserSchema.safeParse(data)

    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.user.create({
            data: {
                name: result.data.name,
                ap_paterno: result.data.ap_paterno,
                ap_materno: result.data.ap_materno,
                birthday_date: result.data.birthday_date,
                cellphone: result.data.cellphone,
                email: result.data.email
            }
        })
    } catch (error) {
        console.log(error)
    }
}