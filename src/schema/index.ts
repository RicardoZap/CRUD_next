import { z } from "zod"

export const CreateUserSchema = z.object({
    name: z.string().min(3, {
        message: "Ingresa un nombre válido",
    }),
    ap_paterno: z.string().min(3, {
        message: "Ingresa un apellido válido",
    }),
    ap_materno: z.string().min(3, {
        message: "Ingresa un apellido válido",
    }),
    birthday_date: z.date().refine((date) => {
        return date < new Date() && date > new Date("1900-01-01")
    }, {
        message: "Ingresa una fecha válida",
    }),
    cellphone: z.string()
        .min(10, {
            message: "Ingresa un teléfono válido",
        })
        .regex(/^\d+$/, "Solo se permiten números"),
    email: z.string().email({
        message: "Ingresa un email válido",
    }),
})

export const CreateEnterpriseSchema = z.object({
    name: z.string().min(3, {
        message: "Ingrese un nombre válido"
    }),
    address: z.string().min(10, {
        message: "Ingrese una dirección válida"
    }),
    cellphone: z.string()
        .min(10, "Debe tener al menos 10 dígitos")
        .max(15, "Máximo 15 dígitos")
        .regex(/^\d+$/, "Solo se permiten números"),
    email: z.string().email({
        message: "Ingresa un email válido"
    })
})

export const CreateAssignmentSchema = z.object({
    name: z.string().min(3, {
        message: "Ingrese un cargo válido"
    }),
    userId: z.number().min(10, {
        message: "Ingrese un usuario válido"
    }),
    enterpriseId: z.number().min(10, {
        message: "Ingrese una empresa válida"
    })
})

export const CreateRolSchema = z.object({
    rol_name: z.string().min(3, {
        message: "Ingrese un Rol válido"
    })
})