"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AppLocale } from "@/lib/i18n/routing";
import { formatBillionEur, formatBillionsShortAxis } from "@/lib/formatting";
import type { FundingFlowsChartPoint } from "@/features/pension/model/types";

type FundingFlowsMultiLineChartProps = {
  points: FundingFlowsChartPoint[];
  locale: AppLocale;
  ariaLabel: string;
  axisBillionsNote: string;
  legendContributions: string;
  legendInvestment: string;
  legendExpenditure: string;
  tooltipYearLabel: string;
};

export function FundingFlowsMultiLineChart({
  points,
  locale,
  ariaLabel,
  axisBillionsNote,
  legendContributions,
  legendInvestment,
  legendExpenditure,
  tooltipYearLabel,
}: FundingFlowsMultiLineChartProps) {
  return (
    <div className="w-full" role="img" aria-label={ariaLabel} style={{ minHeight: 300 }}>
      <ResponsiveContainer width="100%" height={340}>
        <LineChart
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
          <Tooltip
            cursor={{ stroke: "#a8a29e", strokeWidth: 1 }}
            wrapperStyle={{ outline: "none" }}
            content={({ active, payload }) => {
              if (!active || !payload?.[0]) return null;
              const row = payload[0].payload as FundingFlowsChartPoint;
              return (
                <div className="max-w-[min(100vw-2rem,20rem)] rounded border border-stone-200 bg-white px-3 py-2.5 text-left text-sm shadow-md shadow-stone-900/10">
                  <p className="font-medium text-stone-900">
                    {tooltipYearLabel} {row.year}
                  </p>
                  <ul className="mt-2 space-y-1.5 text-stone-700">
                    <li className="flex justify-between gap-4">
                      <span className="text-stone-500">{legendContributions}</span>
                      <span className="tabular-nums">
                        {formatBillionEur(row.contributionsBillionEur, locale, 1)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-stone-500">{legendInvestment}</span>
                      <span className="tabular-nums">
                        {formatBillionEur(row.investmentReturnsBillionEur, locale, 1)}
                      </span>
                    </li>
                    <li className="flex justify-between gap-4">
                      <span className="text-stone-500">{legendExpenditure}</span>
                      <span className="tabular-nums">
                        {formatBillionEur(row.pensionExpenditureBillionEur, locale, 1)}
                      </span>
                    </li>
                  </ul>
                </div>
              );
            }}
          />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => (
              <span className="text-xs text-stone-600">{value}</span>
            )}
          />
          <Line
            type="monotone"
            dataKey="contributionsBillionEur"
            name={legendContributions}
            stroke="#1c1917"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#1c1917", stroke: "#fafaf9", strokeWidth: 1 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="investmentReturnsBillionEur"
            name={legendInvestment}
            stroke="#0f766e"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#0f766e", stroke: "#fafaf9", strokeWidth: 1 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="pensionExpenditureBillionEur"
            name={legendExpenditure}
            stroke="#78716c"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: "#57534e", stroke: "#fafaf9", strokeWidth: 1 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
