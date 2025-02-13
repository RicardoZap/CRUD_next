"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "react-toastify"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { CreateUserSchema } from "@/src/schema"
import { createUser } from "@/actions/create-user"
import { useDialogStore } from "@/src/store"
import { User } from "@prisma/client"
import { updateUser } from "@/actions/update-user"
import { mutate } from "swr"
import { useState } from "react"
import { es } from 'date-fns/locale' 

type CreateFormProps = {
    user?: User | null
    onClose?: () => void
}
  
export function CreateForm({ user = null, onClose }: CreateFormProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(user)
    const [date, setDate] = useState<Date | undefined>()

    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: selectedUser || {
            name: "",
            ap_paterno: "",
            ap_materno: "",
            birthday_date: undefined,
            cellphone: "",
            email: "",
        },
    })

    function handleClose() {
        form.reset()
        setSelectedUser(null)
        onClose && onClose()
    }

    async function onSubmit(data: z.infer<typeof CreateUserSchema>) {
        if (user) {
            await updateUser(user.id, data)
            useDialogStore.getState().setUserUpdated(true)
            mutate('/users/api')
            toast.success("Usuario Editado Correctamente")
        } else {
            await createUser(data)
            useDialogStore.getState().setUserCreated(true)
            mutate('/users/api')
            toast.success("Usuario Agregado Correctamente")
        }
        useDialogStore.getState().closeDialog()
        handleClose()
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full space-y-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Nombre(s)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Juan" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ap_paterno"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Apellido Paterno</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. Pérez" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="ap_materno"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Apellido Materno</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ej. López" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                        control={form.control}
                        name="birthday_date"
                        render={({ field }) => (
                            <FormItem className="flex-2">
                                <FormLabel>Fecha de Nacimiento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Selecciona una fecha</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            locale={es}
                                            className="w-full"
                                            fromYear={1980}
                                            toYear={new Date().getFullYear()}
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            captionLayout="dropdown-buttons"
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cellphone"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Teléfono</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Ej. 5551234567" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Ej. correo@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex justify-center">
                    <Button type="submit" onClick={() => onSubmit}>{user ? "Actualizar" : "Enviar"}</Button>
                </div>
            </form>
        </Form>
    )
}
