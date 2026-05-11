import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts'

const DEFAULT_DATA = [
  { indicator: 'Prevalencia Vapeo', antes: 19.4, despues: 15.8 },
  { indicator: 'Inicio Consumo',    antes: 8.2,  despues: 5.1  },
  { indicator: 'Consumo Dual',      antes: 11.5, despues: 9.3  },
  { indicator: 'Percepción Riesgo', antes: 42.1, despues: 63.8 },
]

interface TooltipEntry { name: string; value: number; color: string }

interface CustomTooltipProps {
  active?:  boolean
  payload?: TooltipEntry[]
  label?:   string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-slate-200 rounded-[8px] px-[14px] py-[10px] shadow-[0_4px_12px_rgba(0,0,0,0.10)] text-[13px]">
      <p className="font-semibold mb-[6px] text-slate-800">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="my-0.5" style={{ color: entry.color }}>
          {entry.name}: <strong>{entry.value}%</strong>
        </p>
      ))}
    </div>
  )
}

interface ComparisonChartProps {
  data?:     typeof DEFAULT_DATA
  title?:    string
  subtitle?: string
  layout?:   'horizontal' | 'vertical'
  height?:   number
}

export function ComparisonChart({
  data     = DEFAULT_DATA,
  title    = 'Comparación Antes vs. Después',
  subtitle = 'Indicadores clave pre y post intervención',
  layout   = 'horizontal',
  height   = 320,
}: ComparisonChartProps) {
  const isHorizontal = layout === 'horizontal'

  return (
    <div className="bg-white rounded-[12px] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.07)] border border-slate-200">
      <div className="flex justify-between items-start mb-5">
        <div>
          <div className="text-[16px] font-bold text-slate-800">{title}</div>
          <div className="text-[12px] text-slate-500 mt-[3px]">{subtitle}</div>
        </div>
        <span className="px-3 py-1 rounded-[20px] bg-green-50 text-green-700 text-[12px] font-semibold border border-green-200">
          Q4 2025
        </span>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 5, right: 20, left: isHorizontal ? 140 : 0, bottom: 5 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          {isHorizontal ? (
            <>
              <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
              <YAxis type="category" dataKey="indicator" tick={{ fontSize: 12, fill: '#475569' }} width={140} />
            </>
          ) : (
            <>
              <XAxis dataKey="indicator" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} unit="%" />
            </>
          )}
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: '13px', paddingTop: '16px' }}
            formatter={(value) => (
              <span className="text-slate-600 font-medium">
                {value === 'antes' ? 'Antes' : 'Después'}
              </span>
            )}
          />
          <Bar dataKey="antes"   name="antes"   fill="#1a5c3a" radius={[0, 4, 4, 0]} />
          <Bar dataKey="despues" name="despues" fill="#4ade80" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
