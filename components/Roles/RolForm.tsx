"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button";
import { CreateRolSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Rol } from "@prisma/client";
import { CircleArrowLeft } from 'lucide-react';
import { updateRol } from "@/actions/assignment/update-assignment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createRol } from "@/actions/roles/create-rol";
import { Input } from "../ui/input";

type RolFormProps = {
    data?: Rol
}

export default function RolForm({ data }: RolFormProps) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const form = useForm<z.infer<typeof CreateRolSchema>>({
        resolver: zodResolver(CreateRolSchema),
        defaultValues: {
            rol_name: data?.rol_name || ""
        }
    })

    async function onSubmit(data: z.infer<typeof CreateRolSchema>) {
        console.log(data)
        if (id) {
            const response = await updateRol(id, data)
            if (response?.errors) {
                toast.error("Error al Actualizar el Rol")
                console.log(response.errors)
                return
            }
            toast.success("Rol Actualizado Correctamente")
            router.push("/roles")
        } else {
            const response = await createRol(data);
            if (response?.errors) {
                toast.error("Error al Agregar el Rol")
                console.error(response.errors)
                return
            }
            toast.success("Rol Agregado Correctamente")
            router.push("/roles")
        }
    }

    async function backPage() {
        router.push("/roles")
    }

    return (
        <div className="container p-5 w-full flex flex-col items-center">
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-3xl self-start">{data ? "Editar Rol: " : "Nuevo Rol"} {data?.rol_name}</h1>
                <Button onClick={() => backPage()}><CircleArrowLeft></CircleArrowLeft>Regresar</Button>
            </div>

            <Form {...form}>
                <form className="space-y-4 mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="rol_name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="rol_name">Nombre de Rol</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre del Rol" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex justify-center w-full">
                        <Button type="submit" className="w-40 mt-5">Enviar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
