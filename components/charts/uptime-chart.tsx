"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { uptimeTrend } from "@/lib/mock-data"

const config = {
  uptime: { label: "Uptime %", color: "var(--chart-1)" },
} satisfies ChartConfig

export function UptimeChart() {
  return (
    <ChartContainer config={config} className="h-[240px] w-full">
      <AreaChart data={uptimeTrend} margin={{ left: 4, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="fillUptime" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-uptime)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--color-uptime)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          domain={[94, 100]}
          tickLine={false}
          axisLine={false}
          width={34}
          tickFormatter={(v) => `${v}%`}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="uptime"
          type="monotone"
          fill="url(#fillUptime)"
          stroke="var(--color-uptime)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}
