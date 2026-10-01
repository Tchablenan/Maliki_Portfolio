'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const config = { views: { label: 'Visites', color: '#00C2FF' } } satisfies ChartConfig;

export function ViewsChart({ data }: { data: { day: string; label: string; views: number }[] }) {
  return (
    <ChartContainer config={config} className="h-[260px] w-full">
      <AreaChart data={data} margin={{ left: -20, right: 8, top: 10 }}>
        <defs>
          <linearGradient id="views-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-views)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="var(--color-views)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={8} minTickGap={24} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={48} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area dataKey="views" type="monotone" stroke="var(--color-views)" strokeWidth={2} fill="url(#views-fill)" />
      </AreaChart>
    </ChartContainer>
  );
}
