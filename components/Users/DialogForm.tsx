import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateForm } from "./CreateUser"
import { useDialogStore } from "@/src/store"

export function DialogForm() {
  const { isOpen, openDialog, closeDialog } = useDialogStore()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? openDialog() : closeDialog())}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={openDialog}><Plus />Agregar Usuario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nuevo Usuario</DialogTitle>
        </DialogHeader>
        <CreateForm />
      </DialogContent>
    </Dialog>
  )
}