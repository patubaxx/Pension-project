"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AppLocale } from "@/lib/i18n/routing";
import { formatBillionEur, formatBillionsShortAxis } from "@/lib/formatting";
import type { SignatureChartPoint } from "@/features/pension/model/types";

type PensionAssetsLineChartProps = {
  points: SignatureChartPoint[];
  locale: AppLocale;
  ariaLabel: string;
  yearLabel: string;
  billionsUnitNote: string;
};

export function PensionAssetsLineChart({
  points,
  locale,
  ariaLabel,
  yearLabel,
  billionsUnitNote,
}: PensionAssetsLineChartProps) {
  return (
    <div
      className="w-full"
      role="img"
      aria-label={ariaLabel}
      style={{ minHeight: 280 }}
    >
      <ResponsiveContainer width="100%" height={320}>
        <LineChart
          data={points}
          margin={{ top: 16, right: 8, left: 8, bottom: 8 }}
        >
          <CartesianGrid
            stroke="#e7e5e4"
            strokeDasharray="3 6"
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fill: "#78716c", fontSize: 11 }}
            tickLine={false}
            axisLine={{ stroke: "#d6d3d1" }}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#78716c", fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={48}
            tickFormatter={(v: number) => formatBillionsShortAxis(v, locale)}
            label={{
              value: billionsUnitNote,
              angle: -90,
              position: "insideLeft",
              fill: "#78716c",
              fontSize: 11,
              dx: -4,
            }}
          />
          <Tooltip
            cursor={{ stroke: "#a8a29e", strokeWidth: 1 }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as SignatureChartPoint;
              return (
                <div className="rounded border border-stone-200 bg-white/95 px-3 py-2 text-left text-sm shadow-sm">
                  <p className="font-medium text-stone-900">
                    {yearLabel} {row.year}
                  </p>
                  <p className="text-stone-600">
                    {formatBillionEur(row.valueBillionEur, locale, 1)}
                  </p>
                </div>
              );
            }}
          />
          <Line
            type="monotone"
            dataKey="valueBillionEur"
            stroke="#44403c"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#1c1917" }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
