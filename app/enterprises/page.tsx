"use client"
import { useRouter } from "next/navigation";
import TableEnterprise from "@/components/Enterprise/TableEnterpirse";
import { Button } from "@/components/ui/button";
import { Building2 } from 'lucide-react';

export default function EnterprisesPage() {
  const router = useRouter()

  const handleClick = () => {
    router.push("enterprises/new")
  };

  return (
    <div className="flex flex-col container p-5">
        <div className="flex flex-row justify-between">
            <h1 className="text-3xl">Listado de Empresas</h1>
            <Button className="bg-blue-500 text-white hover:bg-blue-700 hover:text-white" onClick={handleClick}><Building2/>Agregar Empresa</Button>
        </div>

        <div className="flex flex-col w-full">
          <TableEnterprise
            data={[]}
          />
        </div>
    </div>
  )
}
