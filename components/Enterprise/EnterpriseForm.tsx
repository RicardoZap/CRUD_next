"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateEnterpriseSchema } from "@/src/schema";
import { createEnterprise } from "@/actions/create-enterprise";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

export default function EnterpriseForm() {
    const router = useRouter()

    const form = useForm<z.infer<typeof CreateEnterpriseSchema>>({
        resolver: zodResolver(CreateEnterpriseSchema),
        defaultValues: {
            name: "",
            address: "",
            cellphone: 0,
            email: ""
        }
    })

    const formSchema = z.object({
        name: z.string().min(2, "El nombre debe de tener al menos 2 caracteres"),
        address: z.string().min(5, "La dirección es obligatoria"),
        cellphone: z.string()
            .min(10, "Debe tener al menos 10 dígitos")
            .max(15, "Máximo 15 dígitos")
            .regex(/^\d+$/, "Solo se permiten números"),
        email: z.string().email("Email inválido")
    });

    async function onSubmit(data: z.infer<typeof CreateEnterpriseSchema>) {
        await createEnterprise(data)
        toast.success("Usuario Agregado Correctamente")
        router.push("/enterprises")
    }

    return (
        <div className="container p-5 w-full flex flex-col items-center">
            <h1 className="text-3xl self-start">Nueva Empresa</h1>

            <Form {...form}>
                <form className="space-y-4 mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)}>
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
