import { ComparisonChart } from '../../components/ComparisonChart/ComparisonChart'
import { EmptyState } from '../../components/EmptyState/EmptyState'
import { ErrorBanner } from '../../components/ErrorBanner/ErrorBanner'

const DATA_ERROR: string | null = null
const DATA_EMPTY = false

type MetricVariant  = 'default' | 'critical' | 'warning'
type IconVariant    = 'blue' | 'red' | 'amber'

interface MetricCardProps {
  label:       string
  value:       string
  description: string
  badge?:      string
  variant?:    MetricVariant
  iconVariant: IconVariant
  icon:        React.ReactNode
}

const TrendUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
  </svg>
)
const AlertMetricIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)
const ArrowUpRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7,7 17,7 17,17" />
  </svg>
)
const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

const METRICS: MetricCardProps[] = [
  {
    label: 'PREVALENCIA TOTAL', value: '18.5%',
    description: 'de jóvenes de 18–25 años',
    icon: <TrendUpIcon />, iconVariant: 'blue', variant: 'default',
  },
  {
    label: 'ÍNDICE DE TOXICIDAD', value: '7.8', badge: 'CRÍTICO',
    description: 'ITCA en escala de 0–10',
    icon: <AlertMetricIcon />, iconVariant: 'red', variant: 'critical',
  },
  {
    label: 'CONSUMO DUAL', value: '+24.7%',
    description: 'Crecimiento interanual',
    icon: <ArrowUpRightIcon />, iconVariant: 'amber', variant: 'warning',
  },
]

function MetricCard({ label, value, description, badge, variant = 'default', iconVariant, icon }: MetricCardProps) {
  return (
    <div
      className={`metric-card-glass flex flex-col gap-3 p-[22px] rounded-[18px] ${variant === 'critical' ? 'metric-card-glass--critical' : ''} ${variant === 'warning' ? 'metric-card-glass--warning' : ''}`}
      data-testid={`metric-card-${variant}`}
    >
      <div className="flex items-center gap-2.5">
        <span className={`metric-icon-${iconVariant} w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0`}>
          {icon}
        </span>
        <span className="text-[11px] font-bold tracking-[0.9px] text-[#5580a8] uppercase leading-[1.3] dark:text-white/35">
          {label}
        </span>
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className={`font-display text-[40px] font-extrabold leading-none tracking-[-1.5px] dark:text-white ${variant === 'critical' ? 'text-[#dc2626]' : 'text-[#0c1f3f]'}`}>
          {value}
        </span>
        {badge && (
          <span className="px-2.5 py-[3px] rounded-[20px] bg-[rgba(239,68,68,0.10)] text-[#dc2626] text-[11px] font-bold tracking-[0.5px] border border-[rgba(239,68,68,0.25)] whitespace-nowrap">
            {badge}
          </span>
        )}
      </div>

      <p className="text-[13px] text-[#5580a8] m-0 leading-[1.4] dark:text-white/40">
        {description}
      </p>
    </div>
  )
}

export function ResumenNacional() {
  return (
    <div className="flex flex-col gap-6" data-testid="resumen-nacional">

      {DATA_ERROR && <ErrorBanner message={DATA_ERROR} actionLabel="Reintentar" />}
      {DATA_EMPTY && <EmptyState title="Sin datos disponibles" description="No hay información de consumo para el período seleccionado." />}

      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-[26px] font-extrabold text-[#0c1f3f] mb-1 tracking-[-0.4px] leading-[1.15] dark:text-white">
            Panel de Resumen Nacional
          </h1>
          <p className="text-sm text-[#5580a8] dark:text-white/40">
            Vista ejecutiva de indicadores clave de salud pública
          </p>
        </div>

        <div className="badge-glass flex items-center gap-2 px-4 py-[9px] rounded-[12px] text-sm text-[#3a5a80] whitespace-nowrap shrink-0">
          <span className="text-[#2563eb] dark:text-[#93c5fd] shrink-0"><UsersIcon /></span>
          <span>Población objetivo: </span>
          <strong className="text-[#2563eb] font-bold dark:text-[#93c5fd]">18 a 25 años</strong>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[580px]:grid-cols-1">
        {METRICS.map((m) => <MetricCard key={m.label} {...m} />)}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <ComparisonChart
          title="Comparativa de Consumo"
          subtitle="Prevalencia por tipo de producto — antes vs. después de intervención"
          layout="horizontal"
          height={300}
        />
      </div>
    </div>
  )
}
