"use client"

import { Label, Pie, PieChart } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const data = [
  { name: "Optimal", value: 812, fill: "var(--chart-3)" },
  { name: "Monitor", value: 316, fill: "var(--chart-2)" },
  { name: "At Risk", value: 118, fill: "var(--chart-1)" },
  { name: "Critical", value: 38, fill: "var(--destructive)" },
]

const config = {
  value: { label: "Assets" },
  Optimal: { label: "Optimal", color: "var(--chart-3)" },
  Monitor: { label: "Monitor", color: "var(--chart-2)" },
  "At Risk": { label: "At Risk", color: "var(--chart-1)" },
  Critical: { label: "Critical", color: "var(--destructive)" },
} satisfies ChartConfig

export function AssetHealthChart() {
  const total = data.reduce((s, d) => s + d.value, 0)
  return (
    <div className="flex flex-col items-center gap-4">
      <ChartContainer config={config} className="mx-auto aspect-square h-[220px]">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={64} outerRadius={92} strokeWidth={2}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                        {total.toLocaleString()}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 20} className="fill-muted-foreground text-xs">
                        Assets
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="grid w-full grid-cols-2 gap-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="size-2.5 rounded-full" style={{ background: d.fill }} />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="ml-auto font-medium tabular-nums">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
