"use server";

import prisma from "@/lib/prisma";
import { CreateRolSchema } from "@/src/schema";
import { z } from "zod";

export async function createRol(data: z.infer<typeof CreateRolSchema>) {
    const result = CreateRolSchema.safeParse(data);

    if (!result.success) {
        return { errors: result.error.issues };
    }

    try {
        await prisma.rol.create({
            data: {
                rol_name: result.data.rol_name,
            }
        })
        
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Error en la base de datos" };
    }
}
