import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTendencias } from '../../services/api'
import type { TendenciasData } from '../../types/api'

export function Tendencias() {
  const [data, setData] = useState<TendenciasData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getTendencias()
      .then(res => {
        if (res.success) setData(res.data)
        else setError(res.error ?? 'Error desconocido')
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[14px] text-[#5580a8] dark:text-white/40">Cargando tendencias...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="metric-card-glass metric-card-glass--critical p-5 rounded-[18px] max-w-lg mx-auto mt-12">
        <p className="text-[14px] font-semibold text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  if (!data) return null

  const fumadores2016Display = data.fumadores2016 >= 1_000_000 ? `~${(data.fumadores2016 / 1_000_000).toFixed(1)}M` : formatNumber(data.fumadores2016)
  const fumadores2025Display = data.fumadores2025 >= 1_000_000 ? `~${(data.fumadores2025 / 1_000_000).toFixed(1)}M` : formatNumber(data.fumadores2025)
  const fumadoresDelta = data.fumadores2025 - data.fumadores2016
  const fumadoresDeltaDisplay = fumadoresDelta >= 1_000_000 ? `+${(fumadoresDelta / 1_000_000).toFixed(0)}M` : `+${formatNumber(fumadoresDelta)}`

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[11px] uppercase tracking-[0.9px] text-[#5580a8] dark:text-white/35 mb-1.5">
          Airtellecta &rsaquo; Panel Ejecutivo &rsaquo; Tendencias
        </p>
        <h1 className="font-display text-[22px] font-extrabold tracking-[-0.3px] text-[#0c1f3f] dark:text-white/95">
          Tendencias
        </h1>
        <p className="text-[14px] text-[#5580a8] dark:text-white/35 mt-1.5 leading-relaxed">
          Comparativo ENCODAT 2016 vs ENCODAT 2025 — como han cambiado los indicadores de consumo de tabaco en Mexico en 9 anios.
        </p>
      </div>

      {/* Insight banner */}
      <div className="metric-card-glass rounded-[18px] p-[18px] mb-6 flex items-center gap-3.5" style={{ borderLeft: '4px solid #ef4444' }}>
        <div className="w-[38px] h-[38px] rounded-[10px] flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.10)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2.5" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>
        </div>
        <p className="text-[14px] text-[#5580a8] dark:text-white/65 leading-relaxed">
          La prevalencia de tabaquismo <strong className="text-red-400 font-bold">SUBIO en 9 anios</strong>. De {data.prevalencia2016.toFixed(2)}% a {data.prevalencia2025.toFixed(2)}% — un aumento de{' '}
          <strong className="text-red-400 font-bold">+{data.deltaPp.toFixed(2)} puntos porcentuales</strong>. Las politicas actuales no estan funcionando.
        </p>
      </div>

      {/* Period badges */}
      <div className="flex gap-3 mb-6">
        <span className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[12px] font-semibold" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.15)', color: '#93c5fd' }}>
          <span className="w-2 h-2 rounded-full bg-blue-500" />ENCODAT 2016-2017
        </span>
        <span className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-[12px] font-semibold" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)', color: '#fdba74' }}>
          <span className="w-2 h-2 rounded-full bg-orange-500" />ENCODAT 2025
        </span>
      </div>

      {/* Section label */}
      <SectionLabel text="Indicadores de Consumo" />

      {/* Trend cards */}
      <div className="grid grid-cols-4 gap-4 mb-7">
        <TrendCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>}
          iconBg="rgba(59,130,246,0.10)"
          iconColor="#60a5fa"
          label="Prevalencia Fumadores"
          current={`${data.prevalencia2025.toFixed(2)}%`}
          currentYear="ENCODAT 2025"
          previous={`${data.prevalencia2016.toFixed(2)}%`}
          previousYear="ENCODAT 2016"
          delta={`+${data.deltaPp.toFixed(2)} pp`}
          deltaUp
          bar2016Pct={(data.prevalencia2016 / 20) * 100}
          bar2025Pct={(data.prevalencia2025 / 20) * 100}
          source="Ponderada con ponde_ss / ponde_f"
        />
        <TrendCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /></svg>}
          iconBg="rgba(8,145,178,0.10)"
          iconColor="#22d3ee"
          label="Fumadores Estimados"
          current={fumadores2025Display}
          currentYear="ENCODAT 2025 + CONAPO"
          previous={fumadores2016Display}
          previousYear="ENCODAT 2016"
          delta={fumadoresDeltaDisplay}
          deltaUp
          bar2016Pct={62}
          bar2025Pct={73}
          source="Prevalencia x Pob. 18+ CONAPO"
        />
        <TrendCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>}
          iconBg="rgba(139,92,246,0.10)"
          iconColor="#a78bfa"
          label="Usuarios Vapeo"
          current={String(data.vapeo2016)}
          currentYear="ENCODAT 2016 (n encuesta)"
          previous="—"
          previousYear="Dato 2025 pendiente"
          delta="pendiente"
          source="ENCODAT 2016 — variable usa_vape"
        />
        <TrendCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><circle cx="8" cy="12" r="6" /><circle cx="16" cy="12" r="6" /></svg>}
          iconBg="rgba(249,115,22,0.10)"
          iconColor="#fb923c"
          label="Uso Dual (Tabaco + Vapeo)"
          current={String(data.dual2016)}
          currentYear="ENCODAT 2016 (n encuesta)"
          previous="—"
          previousYear="Dato 2025 pendiente"
          delta="pendiente"
          source="ENCODAT 2016 — variable uso_dual"
        />
      </div>

      {/* Navigation CTAs */}
      <div className="flex justify-between items-center mt-7 pt-5 border-t border-black/[0.06] dark:border-white/[0.04]">
        <button onClick={() => navigate('/dashboard/costos')} className="flex items-center gap-2 text-[13px] font-semibold text-[#5580a8] dark:text-white/40 hover:text-white/70 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Costos por Patologia
        </button>
        <button
          onClick={() => navigate('/dashboard/simulador')}
          className="flex items-center gap-2 text-[13px] font-semibold text-blue-400 px-5 py-2.5 rounded-[10px] transition-colors"
          style={{ background: 'linear-gradient(135deg, rgba(29,92,232,0.15), rgba(19,68,196,0.10))', border: '1px solid rgba(29,92,232,0.20)' }}
        >
          Que podemos hacer? Simular Politicas
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Sources */}
      <div className="flex flex-wrap gap-4 mt-5">
        {['ENCODAT 2016-2017 — CONADIC/INPRFM, ponderador ponde_ss', 'ENCODAT 2025 — CONADIC, ponderador ponde_f', 'CONAPO 2025 — Proyecciones poblacionales 18+'].map(s => (
          <span key={s} className="text-[10px] text-[#5580a8] dark:text-white/18 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-current opacity-60" />{s}
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-[#5580a8] dark:text-white/30">{text}</span>
      <span className="divider-line flex-1 h-px" />
    </div>
  )
}

function TrendCard({ icon, iconBg, iconColor, label, current, currentYear, previous, previousYear, delta, deltaUp, bar2016Pct, bar2025Pct, source }: {
  icon: React.ReactNode; iconBg: string; iconColor: string
  label: string; current: string; currentYear: string
  previous: string; previousYear: string; delta: string
  deltaUp?: boolean; bar2016Pct?: number; bar2025Pct?: number; source: string
}) {
  return (
    <div className="metric-card-glass rounded-[18px] p-[22px] hover:-translate-y-0.5 transition-transform">
      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center mb-3.5" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#5580a8] dark:text-white/35 mb-2.5">{label}</p>
      <p className="font-display text-[32px] font-extrabold tracking-[-1.2px] leading-none mb-1">{current}</p>
      <p className="text-[10px] text-[#5580a8] dark:text-white/22 mb-3.5">{currentYear}</p>

      {/* Divider */}
      <div className="divider-line h-px mb-3" />

      {/* Previous + delta */}
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-[16px] font-bold text-[#5580a8] dark:text-white/45 tracking-[-0.3px]">{previous}</p>
          <p className="text-[10px] text-[#5580a8] dark:text-white/20 mt-0.5">{previousYear}</p>
        </div>
        <span
          className="inline-flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full"
          style={deltaUp ? {
            background: 'rgba(239,68,68,0.10)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.18)',
          } : {
            background: 'rgba(0,0,0,0.04)',
            color: '#5580a8',
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {deltaUp && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7" /></svg>}
          {delta}
        </span>
      </div>

      {/* Mini compare bars */}
      {bar2016Pct != null && bar2025Pct != null && (
        <div className="mt-3.5">
          <MiniBar year="2016" pct={bar2016Pct} color="linear-gradient(90deg, rgba(59,130,246,0.6), rgba(59,130,246,0.3))" />
          <MiniBar year="2025" pct={bar2025Pct} color="linear-gradient(90deg, rgba(249,115,22,0.6), rgba(249,115,22,0.3))" />
        </div>
      )}

      <p className="text-[10px] text-[#5580a8] dark:text-white/18 mt-2.5">{source}</p>
    </div>
  )
}

function MiniBar({ year, pct, color }: { year: string; pct: number; color: string }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-[9px] font-bold text-[#5580a8] dark:text-white/25 w-8 text-right">{year}</span>
      <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.04)' }}>
        <div className="h-full rounded-full animate-fade-up" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  )
}

function formatNumber(n: number): string {
  return n.toLocaleString('es-MX', { maximumFractionDigits: 0 })
}
