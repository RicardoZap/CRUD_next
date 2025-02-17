"use client"
import { useRouter } from "next/navigation";
import TableEnterprise from "@/components/Enterprise/TableEnterpirse";
import { Button } from "@/components/ui/button";
import { Building2 } from 'lucide-react';
import useSWR from "swr";
import { useEnterpriseStore } from "@/src/store";
import LoaderComponent from "@/components/LoaderComponent";

export default function EnterprisesPage() {
  const router = useRouter()
  const url = '/enterprises/api'

  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { enterprises, setEnterprises } = useEnterpriseStore()
  const { data, isLoading } = useSWR(url, fetcher, {
    onSuccess: (data) => setEnterprises(data)
  })

  const handleClick = () => {
    router.push("enterprises/new")
  };

  if (isLoading) return <>
    <div className="flex justify-center items-center h-screen w-full">
      <LoaderComponent />
    </div>
  </>

  return (
    <div className="flex flex-col container p-5">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Listado de Empresas</h1>
        <Button className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white" onClick={handleClick}><Building2 />Agregar Empresa</Button>
      </div>

      <div className="flex flex-col w-full">
        <TableEnterprise
          data={enterprises || []}
        />
      </div>
    </div>
  )
}
