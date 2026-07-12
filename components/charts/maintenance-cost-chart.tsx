"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { maintenanceCost } from "@/lib/mock-data"

const config = {
  planned: { label: "Planned", color: "var(--chart-1)" },
  reactive: { label: "Reactive", color: "var(--chart-2)" },
} satisfies ChartConfig

export function MaintenanceCostChart() {
  return (
    <ChartContainer config={config} className="h-[260px] w-full">
      <AreaChart data={maintenanceCost} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillPlanned" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-planned)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-planned)" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="fillReactive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-reactive)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-reactive)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={40}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area dataKey="planned" type="monotone" stackId="1" fill="url(#fillPlanned)" stroke="var(--color-planned)" strokeWidth={2} />
        <Area dataKey="reactive" type="monotone" stackId="1" fill="url(#fillReactive)" stroke="var(--color-reactive)" strokeWidth={2} />
      </AreaChart>
    </ChartContainer>
  )
}
