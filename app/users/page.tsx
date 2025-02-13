"use client"
import useSWR, { mutate } from "swr";
import { DialogForm } from "@/components/Users/DialogForm";
import TableComponent from "@/components/Users/TableComponent";
import { useDialogStore, useUserStore } from "@/src/store";
import { useEffect } from "react";

export default function UsersPage() {
  const url = '/users/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

  const { users, setUsers } = useUserStore()
  const { data, isLoading } = useSWR(url, fetcher, {
    onSuccess: (data) => setUsers(data),
  })

  //PENDIENTE EL RESFRESH AL AGREGAR USUARIO, AL ELIMINAR Y EDITAR FUNCIONA, FALTA AL AGREGAR
  const userCreated = useDialogStore((state) => state.userCreated)
  const setUserCreated = useDialogStore((state) => state.setUserCreated)

  const userUpdated = useDialogStore((state) => state.userUpdated)
  const setUserUpdated = useDialogStore((state) => state.setUserUpdated)

  useEffect(() => {
    if (userUpdated || userCreated) {
        mutate(url).then((newData) => {
            if (newData) setUsers(newData); // Asegurar que Zustand se actualice correctamente
        });
        setUserUpdated(false)
        setUserCreated(false)
    }
}, [userCreated, userUpdated])


  if (isLoading) return <p>Cargando...</p>

  if (data) return (
    <div className="container mx-5">
      <h1 className="text-2xl font-semibold">Listado de Usuarios</h1>
      <TableComponent
        data={users || []}
      />
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
        <DialogForm />
      </div>
    </div>
  )
}
