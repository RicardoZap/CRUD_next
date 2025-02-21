"use server";

import prisma from "@/lib/prisma";
import { CreateAssignmentSchema } from "@/src/schema";
import { z } from "zod";

export async function createAssignment(data: z.infer<typeof CreateAssignmentSchema>) {
    const result = CreateAssignmentSchema.safeParse(data);

    if (!result.success) {
        return { errors: result.error.issues };
    }

    try {
        await prisma.assignment.create({
            data: {
                userId: Number(data.userId),
                enterpriseId: Number(data.enterpriseId),
                rolId: Number(data.rolId)
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Error en la base de datos" };
    }
}
