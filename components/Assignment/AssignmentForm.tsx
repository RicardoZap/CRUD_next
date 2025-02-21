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
import { useEnterpriseStore, useRolStore, useUserStore } from "@/src/store";
import { useEffect } from "react";
import { fetchEnterprises } from "@/src/util/enterprises";
import { fetchUsers } from "@/src/util/users";
import { fetchRoles } from "@/src/util/roles";

type AssignmentFormProps = {
    data?: Assignment
}

export default function AssignmentForm({ data }: AssignmentFormProps) {
    const enterprises = useEnterpriseStore((state) => state.enterprises)
    const users = useUserStore((state) => state.users)
    const roles = useRolStore((state) => state.roles)

    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    useEffect(() => {
        fetchEnterprises()
        fetchUsers()
        fetchRoles()
    }, []);

    const form = useForm<z.infer<typeof CreateAssignmentSchema>>({
        resolver: zodResolver(CreateAssignmentSchema),
        defaultValues: {
            rolId: data?.rolId.toString() || "",
            userId: data?.userId.toString() || "",
            enterpriseId: data?.enterpriseId.toString() || "",
        }
    })

    async function onSubmit(data: z.infer<typeof CreateAssignmentSchema>) {
        console.log(data)
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
                <h1 className="text-3xl self-start">{data ? "Editar Asignación: " : "Nueva Asignación"} {data?.userId}</h1>
                <Button onClick={() => backPage()}><CircleArrowLeft></CircleArrowLeft>Regresar</Button>
            </div>

            <Form {...form}>
                <form className="space-y-4 mt-5 w-full" onSubmit={form.handleSubmit(onSubmit)} noValidate>
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="userId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="userId">Usuario</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione un Usuario" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {users.map(user => (
                                                    <SelectItem key={user.id} value={user.id.toString()}>
                                                        {`${user.name} ${user.ap_paterno} ${user.ap_materno}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="enterpriseId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="enterpriseId">Empresa</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione una Empresa" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {enterprises.map(enterprise => (
                                                    <SelectItem key={enterprise.id} value={enterprise.id.toString()}>
                                                        {enterprise.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rolId"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel htmlFor="rolId">Cargo</FormLabel>
                                    <FormControl>
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Seleccione un Rol" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {roles.map(rol => (
                                                    <SelectItem key={rol.id} value={rol.id.toString()}>
                                                        {rol.rol_name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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


