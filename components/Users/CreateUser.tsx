"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { CreateUserSchema } from "@/src/schema"

export function CreateForm() {
    const form = useForm<z.infer<typeof CreateUserSchema>>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            name: "",
            ap_paterno: "",
            ap_materno: "",
            fecha_nacimiento: undefined,
            telefono: "",
            email: "",
        },
    })

    function onSubmit(data: z.infer<typeof CreateUserSchema>) {
        toast({
            title: "Datos enviados:",
            description: (
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
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
                        name="fecha_nacimiento"
                        render={({ field }) => (
                            <FormItem className="flex-1">
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
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
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
                        name="telefono"
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
                    <Button type="submit">Enviar</Button>
                </div>
            </form>
        </Form>
    )
}
