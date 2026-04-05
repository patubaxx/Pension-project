"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
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
  valueLabel: string;
  seriesLabel: string;
  billionsUnitNote: string;
  /** Vertical guide at the latest year (subtle editorial cue). */
  highlightLatestYear?: number;
  /** Exposed to assistive tech via Recharts line name. */
  lineName: string;
};

export function PensionAssetsLineChart({
  points,
  locale,
  ariaLabel,
  yearLabel,
  valueLabel,
  seriesLabel,
  billionsUnitNote,
  highlightLatestYear,
  lineName,
}: PensionAssetsLineChartProps) {
  return (
    <div className="w-full" role="img" aria-label={ariaLabel} style={{ minHeight: 300 }}>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart
          data={points}
          margin={{ top: 20, right: 12, left: 0, bottom: 12 }}
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
            width={56}
            tickFormatter={(v: number) => formatBillionsShortAxis(v, locale)}
            label={{
              value: billionsUnitNote,
              angle: -90,
              position: "insideLeft",
              fill: "#57534e",
              fontSize: 11,
              dx: 2,
              dy: 28,
            }}
          />
          <Tooltip
            cursor={{ stroke: "#a8a29e", strokeWidth: 1 }}
            wrapperStyle={{ outline: "none" }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as SignatureChartPoint;
              return (
                <div className="max-w-[min(100vw-2rem,18rem)] rounded border border-stone-200 bg-white px-3 py-2.5 text-left text-sm shadow-md shadow-stone-900/10">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                    {seriesLabel}
                  </p>
                  <p className="mt-1 font-medium text-stone-900">
                    {yearLabel} {row.year}
                  </p>
                  <p className="mt-1 text-stone-700">
                    <span className="text-stone-500">{valueLabel}: </span>
                    {formatBillionEur(row.valueBillionEur, locale, 1)}
                  </p>
                </div>
              );
            }}
          />
          {highlightLatestYear != null ? (
            <ReferenceLine
              x={highlightLatestYear}
              stroke="#d6d3d1"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
          ) : null}
          <Line
            type="monotone"
            dataKey="valueBillionEur"
            name={lineName}
            stroke="#292524"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#1c1917", stroke: "#fafaf9", strokeWidth: 1 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
