"use client"
import useSWR from "swr";
import { DialogForm } from "@/components/Users/DialogForm";
import TableComponent from "@/components/Users/TableComponent";

export default function UsersPage() {
  const url = '/users/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)

  const { data, isLoading } = useSWR(url, fetcher)

  if (isLoading) return <p>Cargando...</p>

  if(data) return (
    <>
      <div className="flex flex-col items-center justify-between">
        <h1 className="text-2xl font-semibold mt-5">Listado de Usuarios</h1>
        <TableComponent
          data={data || []}
        />
        
      </div>
      <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50">
        <DialogForm />
      </div>
    </>
  )
}
