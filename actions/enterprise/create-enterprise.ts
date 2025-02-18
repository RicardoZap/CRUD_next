"use server";

import prisma from "@/lib/prisma";
import { CreateEnterpriseSchema } from "@/src/schema";
import { z } from "zod";

export async function createEnterprise(data: z.infer<typeof CreateEnterpriseSchema>) {
    const result = CreateEnterpriseSchema.safeParse(data);

    if (!result.success) {
        return { errors: result.error.issues };
    }

    try {
        await prisma.enterprise.create({
            data: {
                name: result.data.name,
                address: result.data.address,
                cellphone: result.data.cellphone,
                email: result.data.email,
            },
        });

        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Error en la base de datos" };
    }
}
