import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const CAMPAIGN_DATA = [
  { name: 'Digital',  value: 1_080_000, color: '#2563eb' },
  { name: 'TV',       value:   600_000, color: '#7c3aed' },
  { name: 'Radio',    value:   360_000, color: '#0891b2' },
  { name: 'Impresa',  value:   360_000, color: '#059669' },
]

const TOTAL = CAMPAIGN_DATA.reduce((s, d) => s + d.value, 0)

function fmtMXN(v: number) {
  return v >= 1_000_000
    ? `$${(v / 1_000_000).toFixed(1)}M`
    : `$${(v / 1_000).toFixed(0)}K`
}

interface TooltipEntry { name: string; value: number; color?: string }
interface CustomTooltipProps { active?: boolean; payload?: TooltipEntry[] }

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  const d = payload[0]
  const pct = ((d.value / TOTAL) * 100).toFixed(1)
  return (
    <div className="bg-white border border-slate-200 rounded-[10px] px-3 py-2 shadow-lg text-[12px]">
      <p className="font-bold text-slate-800 mb-0.5">{d.name}</p>
      <p className="text-slate-500">{fmtMXN(d.value)} · {pct}%</p>
    </div>
  )
}

interface DonutChartProps {
  title?:    string
  subtitle?: string
}

export function DonutChart({
  title    = 'Gasto Anual en Campañas',
  subtitle = 'Distribución por canal — 2025',
}: DonutChartProps) {
  return (
    <div className="metric-card-glass flex flex-col gap-3 p-5 rounded-[18px]" data-testid="donut-chart">
      <div>
        <p className="text-[11px] font-bold tracking-[0.9px] text-[#5580a8] uppercase dark:text-white/35">
          {title}
        </p>
        <p className="text-[12px] text-[#5580a8] mt-0.5 dark:text-white/30">{subtitle}</p>
      </div>

      {/* Chart + center label */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={160}>
          <PieChart>
            <Pie
              data={CAMPAIGN_DATA}
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={72}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {CAMPAIGN_DATA.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Total centrado */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-display text-[18px] font-extrabold text-[#0c1f3f] leading-none dark:text-white">
            {fmtMXN(TOTAL)}
          </span>
          <span className="text-[10px] text-[#5580a8] mt-0.5 dark:text-white/35">total</span>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex flex-col gap-1.5">
        {CAMPAIGN_DATA.map((d) => (
          <div key={d.name} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
              <span className="text-[12px] text-[#5580a8] truncate dark:text-white/50">{d.name}</span>
            </div>
            <span className="text-[12px] font-semibold text-[#0c1f3f] shrink-0 dark:text-white">
              {((d.value / TOTAL) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
