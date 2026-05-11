import { EmptyState }         from '../../components/EmptyState/EmptyState'
import { ErrorBanner }        from '../../components/ErrorBanner/ErrorBanner'
import { MapaVulnerabilidad } from '../../components/MapaVulnerabilidad/MapaVulnerabilidad'
import { TendenciaChart }     from '../../components/TendenciaChart/TendenciaChart'
import { GastoCampanasCard }  from '../../components/GastoCampanasCard/GastoCampanasCard'
import { DemograficoChart }   from '../../components/DemograficoChart/DemograficoChart'

const DATA_ERROR: string | null = null
const DATA_EMPTY = false

const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
  </svg>
)

const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
  </svg>
)

interface KpiCardProps {
  label:       string
  value:       string
  description: string
  descColor?:  string
  highlight?:  boolean
  icon?:       React.ReactNode
  testId?:     string
}

function KpiCard({ label, value, description, descColor, highlight, icon, testId }: KpiCardProps) {
  return (
    <div
      className={`metric-card-glass flex flex-col gap-2.5 p-5 rounded-[18px] ${highlight ? 'metric-card-glass--highlight' : ''}`}
      data-testid={testId ?? 'kpi-card'}
    >
      <div className="flex items-center gap-1.5">
        {icon && (
          <span className={highlight ? 'text-green-600 dark:text-green-400' : 'text-[#5580a8] dark:text-white/35'}>
            {icon}
          </span>
        )}
        <p className={`text-[13px] font-bold tracking-[0.8px] uppercase ${highlight ? 'text-green-700 dark:text-green-400' : 'text-[#5580a8] dark:text-white/35'}`}>
          {label}
        </p>
      </div>
      <p className={`font-display text-[38px] font-extrabold leading-none tracking-[-1.5px] ${highlight ? 'text-green-700 dark:text-green-400' : 'text-[#0c1f3f] dark:text-white'}`}>
        {value}
      </p>
      <p className={`text-[14px] leading-[1.4] ${descColor ?? 'text-[#5580a8] dark:text-white/40'}`}>
        {description}
      </p>
    </div>
  )
}

export function ResumenNacional() {
  return (
    <div className="flex flex-col gap-4" data-testid="resumen-nacional">

      {DATA_ERROR && <ErrorBanner message={DATA_ERROR} actionLabel="Reintentar" />}
      {DATA_EMPTY && <EmptyState title="Sin datos disponibles" description="No hay información de consumo para el período seleccionado." />}

      {/* ── Fila 1 — 4 KPI cards ── */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          label="Gasto en campañas"
          value="$2.4M"
          description="presupuesto 2025"
          testId="kpi-gasto"
        />
        <KpiCard
          label="Costo en salud pública"
          value="$7.7M"
          description="↑ hospitalizaciones"
          descColor="text-red-500 dark:text-red-400 font-medium"
          testId="kpi-salud"
        />
        <KpiCard
          label="Ahorro Proyectado"
          value="$2.8M"
          description="con segmentación AI"
          highlight
          icon={<SparkleIcon />}
          testId="kpi-ahorro"
        />
        <KpiCard
          label="Consumo 18-25"
          value="18.5%"
          description="contexto epidemiológico"
          icon={<TrendUpIcon />}
          testId="kpi-consumo"
        />
      </div>

      {/* ── Fila 2 — Mapa (3/5) + Consumo por edad (2/5) ── */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <MapaVulnerabilidad />
        </div>
        <div className="col-span-2">
          <DemograficoChart />
        </div>
      </div>

      {/* ── Fila 3 — Gasto campañas (3/5) + Consumo anual (2/5) ── */}
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <GastoCampanasCard />
        </div>
        <div className="col-span-2">
          <TendenciaChart />
        </div>
      </div>

    </div>
  )
}
