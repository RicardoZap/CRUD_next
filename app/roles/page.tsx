"use client"
import LoaderComponent from "@/components/LoaderComponent";
import TableRolComponent from "@/components/Roles/TableRolComponent";
import { Button } from "@/components/ui/button";
import { useRolStore } from "@/src/store";
import { Workflow } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function RolesPage() {
  const router = useRouter()
  const url = '/roles/api'

  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { roles, setRol } = useRolStore()
  const { data, isLoading } = useSWR(url, fetcher, {
    onSuccess: (data) => setRol(data)
  })

  const handleClick = () => {
    router.push("roles/new")
  }

  if (isLoading) return <>
    <div className="flex justify-center items-center h-screen w-full">
      <LoaderComponent />
    </div>
  </>


  return (
    <div className="container m-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Roles</h1>
        <Button className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white" onClick={handleClick}><Workflow />Crear Rol</Button>
      </div>

      <div>
        <TableRolComponent
          data={data}
        />
      </div>
    </div>
  )
}
