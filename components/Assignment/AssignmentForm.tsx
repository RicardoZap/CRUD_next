"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateAssignmentSchema } from "@/src/schema";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Assignment, Enterprise } from "@prisma/client";
import { CircleArrowLeft } from 'lucide-react';
import { createAssignment } from "@/actions/assignment/create-assignment";
import { updateAssignment } from "@/actions/assignment/update-assignment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useEnterpriseStore, useUserStore } from "@/src/store";
import { useEffect } from "react";
import { fetchEnterprises } from "@/src/util/enterprises";
import { fetchUsers } from "@/src/util/users";

type AssignmentFormProps = {
    data?: Assignment
}

export default function AssignmentForm({ data }: AssignmentFormProps) {
    const enterprises = useEnterpriseStore((state) => state.enterprises)
    const users = useUserStore((state) => state.users)
    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    useEffect(() => {
        fetchEnterprises()
        fetchUsers()
    }, []);

    const form = useForm<z.infer<typeof CreateAssignmentSchema>>({
        resolver: zodResolver(CreateAssignmentSchema),
        defaultValues: {
            name: data?.name || "",
            userId: data?.userId || 0,
            enterpriseId: data?.enterpriseId || 0,
        }
    })

    async function onSubmit(data: z.infer<typeof CreateAssignmentSchema>) {
        if (id) {
            const response = await updateAssignment(id, data)
            if (response?.errors) {
                toast.error("Error al Actualizar la Asignación")
                console.log(response.errors)
                return
            }
            toast.success("Asignación Actualizada Correctamente")
            router.push("/assignment")
        } else {
            const response = await createAssignment(data);
            if (response?.errors) {
                toast.error("Error al Agregar la Asignación")
                console.error(response.errors)
                return
            }
            toast.success("Asignación Agregada Correctamente")
            router.push("/assignment")
        }
    }

    async function backPage() {
        router.push("/assignment")
    }

    return (
        <div className="container p-5 w-full flex flex-col items-center">
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="text-3xl self-start">{data ? "Editar Asignación: " : "Nueva Asignación"} {data?.name}</h1>
                <Button onClick={() => backPage()}><CircleArrowLeft></CircleArrowLeft>Regresar</Button>
            </div>

            <Form {...form}>
                <form className="space-y-4 mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-row gap-5">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="userId">Usuario</FormLabel>
                                    <FormControl>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Seleccione un Usuario" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map(user => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>{`${user.name} ${user.ap_paterno} ${user.ap_materno}`}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="enterpriseId"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel htmlFor="enterpriseId">Empresa</FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Seleccione una Empresa" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {enterprises.map(enterprise => (
                                                        <SelectItem key={enterprise.id} value={enterprise.id.toString()}>{enterprise.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="userId"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel htmlFor="userId">Cargo</FormLabel>
                                        <FormControl>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Seleccione una Empresa" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {enterprises.map(enterprise => (
                                                        <SelectItem key={enterprise.id} value={enterprise.id.toString()}>{enterprise.name}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>

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
