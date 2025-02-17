"use client"
import useSWR, { mutate } from "swr";
import { DialogForm } from "@/components/Users/DialogForm";
import TableComponent from "@/components/Users/TableComponent";
import { useDialogStore, useUserStore } from "@/src/store";
import { useEffect } from "react";
import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import LoaderComponent from "@/components/LoaderComponent";

export default function UsersPage() {
  const url = '/users/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

  const { users, setUsers } = useUserStore()
  const { data, isLoading } = useSWR(url, fetcher, {
    onSuccess: (data) => setUsers(data),
  })

  const userCreated = useDialogStore((state) => state.userCreated)
  const setUserCreated = useDialogStore((state) => state.setUserCreated)

  const userUpdated = useDialogStore((state) => state.userUpdated)
  const setUserUpdated = useDialogStore((state) => state.setUserUpdated)

  useEffect(() => {
    if (userUpdated || userCreated) {
        mutate(url).then((newData) => {
            if (newData) setUsers(newData)
        })
        setUserUpdated(false)
        setUserCreated(false)
    }
}, [userCreated, userUpdated])


  if (isLoading) return <>
    <div className="flex justify-center items-center h-screen w-full">
      <LoaderComponent />
    </div>
  </>


  if (data) return (
    <div className="flex flex-col container p-5">
      <h1 className="text-3xl">Listado de Usuarios</h1>
      <TableComponent
        data={users || []}
      />
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
        <DialogForm />
      </div>
    </div>
  )
}
