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
    cellphone: z.string().min(10, {
        message: "Ingresa un teléfono válido",
    }),
    email: z.string().email({
        message: "Ingresa un email válido",
    }),
})