"use server"

import prisma from "@/lib/prisma";
import { CreateUserSchema } from "@/src/schema";
import { z } from "zod";

export async function updateUser(id: number, data: z.infer<typeof CreateUserSchema>) {
    return prisma.user.update({
        where: {
            id
        },
        data
    })
}