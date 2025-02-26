"use client"

import TableAssignmentComponent from "@/components/Assignment/TableAssignmentComponent"
import LoaderComponent from "@/components/LoaderComponent"
import { Button } from "@/components/ui/button"
import { useAssignmentStore } from "@/src/store"
import { Workflow } from "lucide-react"
import { useRouter } from "next/navigation"
import useSWR from "swr"

export default function AssignmentPage() {
  const router = useRouter()
  const url = '/assignment/api'

  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { assignment, setAssignment } = useAssignmentStore()
  const { data, isLoading } = useSWR(url, fetcher, {
    onSuccess: (data) => setAssignment(data)
  })

  const handleClick = () => {
    router.push("assignment/new")
  }

  if (isLoading) return <>
      <div className="flex justify-center items-center h-screen w-full">
        <LoaderComponent />
      </div>
    </>

  return (
    <div className="container m-5">
        <div className="flex flex-row justify-between">
            <h1 className="text-3xl">Asignación de Empresas</h1>
            <Button className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white" onClick={handleClick}><Workflow />Asignar Empresa</Button>
        </div>

        <div>
          <TableAssignmentComponent 
            data={data}
          />
        </div>
    </div>
  )
}
