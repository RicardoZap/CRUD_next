import { BarCharComponent } from "@/components/Dashboard/BarChartComponent"
import CardRendimiento from "@/components/Dashboard/CardRendimiento"
import { LinealChartComponent } from "@/components/Dashboard/LinealChart"
import { LineChartComponent } from "@/components/Dashboard/LineChartComponent"

export default function Page() {
  return (
    <div className="container p-10">
      <div className="mb-3">
        <h1 className="text-2xl font-bold ">Dashboard General</h1>
      </div>
      <div className="grid grid-cols-3 gap-5 w-full items-stretch">
        <div className="flex flex-col h-full">
          <CardRendimiento />
        </div>

        <div className="flex flex-col h-full">
          <LinealChartComponent label="Primera gráfica" />
        </div>

        <div className="flex flex-col h-full">
          <LinealChartComponent label="Segunda gráfica" />
        </div>
      </div>

      {/* Segunda fila: 2 columnas alineadas en altura */}
      <div className="grid grid-cols-2 gap-5 w-full mt-5 items-stretch">
        <div className="flex flex-col h-full">
          <BarCharComponent />
        </div>

        <div className="flex flex-col h-full">
          <LineChartComponent />
        </div>
      </div>
    </div>
  )
}
