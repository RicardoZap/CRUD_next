import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CreateForm } from "./CreateUser"
import { useDialogStore, useUserStore } from "@/src/store"
import { User } from "@prisma/client"

type DialogFormProps = {
  data?: User
}

export function DialogForm({data}: DialogFormProps) {
  const { isOpen, openDialog, closeDialog, userToEdit} = useDialogStore()

  return (
    <Dialog open={isOpen} onOpenChange={(open) => (open ? openDialog() : closeDialog())}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={openDialog}><Plus />Agregar Usuario</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{userToEdit ? ("Editar Usuario") : ("Nuevo Usuario")}</DialogTitle>
        </DialogHeader>
        <CreateForm user={userToEdit} onClose={closeDialog} />
      </DialogContent>
    </Dialog>
  )
}