import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '../ui/button'

export default function CardRendimiento() {
    return (
        <Card className="w-auto h-auto">
            <CardHeader>
                <CardTitle style={
                    { fontSize: 30 }
                }>Tu Rendimiento Mensual</CardTitle>
                <CardDescription>Monto total de ingresos mensuales</CardDescription>

            </CardHeader>
            <CardContent>
                <p className="font-bold text-3xl">$15,234.89</p>
                <Button className="mt-5">Editar Info</Button>
            </CardContent>
        </Card>
    )
}
