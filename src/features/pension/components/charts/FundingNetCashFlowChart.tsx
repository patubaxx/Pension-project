"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AppLocale } from "@/lib/i18n/routing";
import { formatBillionEur, formatBillionsShortAxis } from "@/lib/formatting";
import type { FundingBalanceChartPoint } from "@/features/pension/model/types";

const FILL_POSITIVE = "#292524";
const FILL_NEGATIVE = "#a8a29e";

type FundingNetCashFlowChartProps = {
  points: FundingBalanceChartPoint[];
  locale: AppLocale;
  ariaLabel: string;
  axisBillionsNote: string;
  tooltipYearLabel: string;
  tooltipNetLabel: string;
};

export function FundingNetCashFlowChart({
  points,
  locale,
  ariaLabel,
  axisBillionsNote,
  tooltipYearLabel,
  tooltipNetLabel,
}: FundingNetCashFlowChartProps) {
  return (
    <div className="w-full" role="img" aria-label={ariaLabel} style={{ minHeight: 280 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={points}
          margin={{ top: 16, right: 8, left: 0, bottom: 8 }}
        >
          <CartesianGrid
            stroke="#e7e5e4"
            strokeDasharray="3 6"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fill: "#57534e", fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: "#d6d3d1" }}
            interval="preserveStartEnd"
            tickMargin={8}
          />
          <YAxis
            tick={{ fill: "#57534e", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            width={52}
            tickFormatter={(v: number) => formatBillionsShortAxis(v, locale)}
            label={{
              value: axisBillionsNote,
              angle: -90,
              position: "insideLeft",
              fill: "#57534e",
              fontSize: 11,
              dx: 2,
              dy: 28,
            }}
          />
          <ReferenceLine y={0} stroke="#78716c" strokeWidth={1} />
          <Tooltip
            cursor={{ fill: "#fafaf9" }}
            wrapperStyle={{ outline: "none" }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as FundingBalanceChartPoint;
              return (
                <div className="max-w-[min(100vw-2rem,18rem)] rounded border border-stone-200 bg-white px-3 py-2.5 text-left text-sm shadow-md shadow-stone-900/10">
                  <p className="font-medium text-stone-900">
                    {tooltipYearLabel} {row.year}
                  </p>
                  <p className="mt-1 text-stone-700">
                    <span className="text-stone-500">{tooltipNetLabel}: </span>
                    {formatBillionEur(row.netCashFlowBillionEur, locale, 1)}
                  </p>
                </div>
              );
            }}
          />
          <Bar dataKey="netCashFlowBillionEur" radius={[2, 2, 0, 0]} maxBarSize={28}>
            {points.map((entry) => (
              <Cell
                key={entry.year}
                fill={
                  entry.netCashFlowBillionEur >= 0 ? FILL_POSITIVE : FILL_NEGATIVE
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
