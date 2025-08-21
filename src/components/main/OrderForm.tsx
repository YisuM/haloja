"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import React from "react"
import { toast } from "react-toastify"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { orderFormSchema } from "@/schema/order/orderFormSchema"

export default function OrderForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof orderFormSchema>>({
        resolver: zodResolver(orderFormSchema),
        defaultValues: {
            server: "wordpress",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof orderFormSchema>) {
        const result = orderFormSchema.safeParse(values);
        if (!result.success) {
            console.error(result.error);
            toast.error("Validation failed. Please check your input.");
            return;
        }
    
        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            });
    
            if (!res.ok) throw new Error("Error creando el pedido");
    
            toast.success("Pedido procesado ✅");
    
            // Redirige al dashboard
            window.location.href = "/dashboard"; // o router.push si usas next/router
        } catch (err) {
            console.error(err);
            toast.error("Error al crear el pedido ❌");
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center justify-center w-full">
                <FormField
                    control={form.control}
                    name="server"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{"Server"}</FormLabel>
                            <FormControl>
                                {/* <Input placeholder="type of server" {...field} /> */}
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value); // actualiza react-hook-form
                                        console.log("Servidor seleccionado:", value); // aquí puedes cambiar el label o hacer más cosas
                                        console.log("Mostrando más opciones...")
                                    }}
                                    value={field.value}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a server" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Servers</SelectLabel>
                                            <SelectItem value="wordpress">Wordpress</SelectItem>
                                            <SelectItem value="drupal">Drupal</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormDescription>
                                This is the CMS that will install in the server.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Campos extra según el servidor */}
                {form.watch("server") === "wordpress" && (
                    <FormField
                        control={form.control}
                        name="wordpressSiteTitle"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>WordPress Site Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre del sitio" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Nombre que se usará al instalar WordPress.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {form.watch("server") === "drupal" && (
                    <FormField
                        control={form.control}
                        name="drupalProfile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Drupal Install Profile</FormLabel>
                                <FormControl>
                                    <Input placeholder="Perfil de instalación" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Perfil de instalación de Drupal.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button className="cursor-pointer" type="submit">Deploy</Button>
            </form>
        </Form>
    )
}