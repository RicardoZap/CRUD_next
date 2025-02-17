"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateEnterpriseSchema } from "@/src/schema";
import { createEnterprise } from "@/actions/create-enterprise";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Enterprise } from "@prisma/client";
import { updateEnterprise } from "@/actions/update-enterprise";
import { CircleArrowLeft } from 'lucide-react';

type EnterpriseFormProps = {
    data?: Enterprise
}

export default function EnterpriseForm({ data }: EnterpriseFormProps) {
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const form = useForm<z.infer<typeof CreateEnterpriseSchema>>({
        resolver: zodResolver(CreateEnterpriseSchema),
        defaultValues: {
            name: data?.name || "",
            address: data?.address || "",
            cellphone: data?.cellphone || "",
            email: data?.email || ""
        }
    })

    async function onSubmit(data: z.infer<typeof CreateEnterpriseSchema>) {
        if (id) {
            const response = await updateEnterprise(id, data)
            if (response?.errors) {
                toast.error("Error al Actualizar la Empresa")
                console.log(response.errors)
                return
            }
            toast.success("Empresa Actualizada Correctamente")
            router.push("/enterprises")
        } else {
            const response = await createEnterprise(data);
            if (response?.errors) {
                toast.error("Error al agregar la empresa")
                console.error(response.errors)
                return
            }
            toast.success("Empresa Agregada Correctamente")
            router.push("/enterprises")
        }
    }

    async function backPage() {
        router.push("/enterprises")
    }

    return (
        <div className="container p-5 w-full flex flex-col items-center">
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-3xl self-start">{data ? "Editar Empresa: " : "Nueva Empresa"} {data?.name}</h1>
                <Button onClick={() => backPage()}><CircleArrowLeft></CircleArrowLeft>Regresar</Button>
            </div>

            <Form {...form}>
                <form className="space-y-4 mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="name">Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre de la Empresa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel htmlFor="address">Dirección</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dirección de la Empresa" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="cellphone"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="name">Teléfono</FormLabel>
                                    <FormControl>
                                        <Input maxLength={10} type="text" placeholder="Teléfono de la Empresa" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel htmlFor="email">Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@ejemplo.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <Button type="submit" className="w-40 mt-5">Enviar</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
