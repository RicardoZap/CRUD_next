import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateForm } from "./CreateUser"

export function DialogForm() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline"><Plus />Agregar Usuario</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md lg:max-w-screen-md flex flex-col justify-between">
                <DialogHeader>
                    <DialogTitle>Nuevo Usario</DialogTitle>
                </DialogHeader>

                <CreateForm />

            </DialogContent>
        </Dialog>
    )
}
