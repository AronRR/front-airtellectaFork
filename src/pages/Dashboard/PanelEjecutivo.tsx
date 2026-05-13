import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPanelEjecutivo } from '../../services/api'
import type { PanelEjecutivo as PanelEjecutivoData } from '../../types/api'
import { VerificationBadge } from '../../components/VerificationBadge'

export function PanelEjecutivo() {
  const [data, setData] = useState<PanelEjecutivoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getPanelEjecutivo()
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
        <p className="text-[14px] text-[#5580a8] dark:text-white/40">Cargando panel ejecutivo...</p>
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

  const { cargaEconomica, recaudacion, epidemiologia, costosPorPatologia } = data
  const ratio = cargaEconomica.costoSocialAnualMdp / recaudacion.iepsMasRecienteMdp
  const ratioPrevencion = cargaEconomica.inversionPrevencionMdp / recaudacion.iepsMasRecienteMdp
  const gapAnual = cargaEconomica.costoSocialAnualMdp - recaudacion.iepsMasRecienteMdp

  const costoBarWidth = 100
  const recaudacionBarWidth = (recaudacion.iepsMasRecienteMdp / cargaEconomica.costoSocialAnualMdp) * 100
  const inversionBarWidth = Math.max((cargaEconomica.inversionPrevencionMdp / cargaEconomica.costoSocialAnualMdp) * 100, 0.5)

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[11px] uppercase tracking-[0.9px] text-[#5580a8] dark:text-white/35 mb-1.5">
          Airtellecta &rsaquo; Panel Ejecutivo
        </p>
        <h1 className="font-display text-[22px] font-extrabold tracking-[-0.3px] text-[#0c1f3f] dark:text-white/95">
          Panel Ejecutivo
        </h1>
      </div>

      {/* Section: Carga Economica */}
      <SectionLabel text="Carga Economica del Tabaco en Mexico" />

      <div className="grid grid-cols-3 gap-4 mb-7">
        {/* Costo Social */}
        <div className="metric-card-glass rounded-[18px] p-5 relative" style={{ borderLeft: '4px solid #ef4444' }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#5580a8] dark:text-white/40 mb-2">Costo Social Anual</p>
          <p className="font-display text-[36px] font-extrabold tracking-[-1.5px] text-red-500 leading-none mb-1.5">
            ${formatNumber(cargaEconomica.costoSocialAnualMdp)}<span className="text-[16px] font-semibold opacity-60 ml-0.5">MDP</span>
          </p>
          <p className="text-[11px] text-[#5580a8] dark:text-white/28">OPS 2025 &middot; Costo directo + indirecto</p>
        </div>

        {/* Recaudacion IEPS */}
        <div className="metric-card-glass rounded-[18px] p-5 relative" style={{ borderLeft: '4px solid #eab308' }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#5580a8] dark:text-white/40 mb-2">Recaudacion IEPS Tabaco</p>
          <p className="font-display text-[36px] font-extrabold tracking-[-1.5px] text-yellow-500 leading-none mb-1.5">
            ${formatNumber(recaudacion.iepsMasRecienteMdp)}<span className="text-[16px] font-semibold opacity-60 ml-0.5">MDP</span>
          </p>
          <p className="text-[11px] text-[#5580a8] dark:text-white/28">
            {recaudacion.fuente} {recaudacion.anio}
            {recaudacion.nivelVerificacion && recaudacion.nivelVerificacion !== 'OFICIAL' && (
              <span className="ml-2"><VerificationBadge nivel={recaudacion.nivelVerificacion} /></span>
            )}
          </p>
        </div>

        {/* Inversion Prevencion */}
        <div className="metric-card-glass rounded-[18px] p-5 relative" style={{ borderLeft: '4px solid #6b7280' }}>
          <div className="absolute top-3 right-3">
            <VerificationBadge nivel="ESTIMACION_PRENSA" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#5580a8] dark:text-white/40 mb-2">Inversion en Prevencion</p>
          <p className="font-display text-[36px] font-extrabold tracking-[-1.5px] text-gray-500 leading-none mb-1.5">
            ${formatNumber(cargaEconomica.inversionPrevencionMdp)}<span className="text-[16px] font-semibold opacity-60 ml-0.5">MDP</span>
          </p>
          <p className="text-[11px] text-[#5580a8] dark:text-white/28">Estimacion prensa &middot; Sin verificar</p>
        </div>
      </div>

      {/* Section: Gap Economico */}
      <SectionLabel text="Gap Economico" />

      <div className="metric-card-glass rounded-[18px] p-6 mb-7">
        {/* Barra Costo Social */}
        <GapBar
          label="Costo social del tabaco"
          value={cargaEconomica.costoSocialAnualMdp}
          width={costoBarWidth}
          color="#ef4444"
          gradientFrom="rgba(239,68,68,0.7)"
          gradientTo="rgba(239,68,68,0.4)"
        />
        {/* Barra Recaudacion */}
        <GapBar
          label="Recaudacion IEPS tabaco"
          value={recaudacion.iepsMasRecienteMdp}
          width={recaudacionBarWidth}
          color="#eab308"
          gradientFrom="rgba(234,179,8,0.7)"
          gradientTo="rgba(234,179,8,0.4)"
        />
        {/* Barra Inversion */}
        <GapBar
          label="Inversion en prevencion"
          value={cargaEconomica.inversionPrevencionMdp}
          width={inversionBarWidth}
          color="#6b7280"
          gradientFrom="rgba(107,114,128,0.7)"
          gradientTo="rgba(107,114,128,0.3)"
          last
        />

        {/* Ratios */}
        <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-4 mt-2 grid grid-cols-3 gap-5 items-center">
          <div className="text-center">
            <p className="font-display text-[28px] font-extrabold tracking-[-1px] text-red-500">${ratio.toFixed(2)}</p>
            <p className="text-[11px] text-[#5580a8] dark:text-white/35 mt-1 leading-tight">se gastan en dano<br />por cada $1 recaudado</p>
          </div>
          <div className="text-center">
            <p className="font-display text-[28px] font-extrabold tracking-[-1px] text-gray-500">${ratioPrevencion.toFixed(4)}</p>
            <p className="text-[11px] text-[#5580a8] dark:text-white/35 mt-1 leading-tight">se invierten en prevencion<br />por cada $1 recaudado</p>
          </div>
          <div className="text-center p-3.5 rounded-[14px]" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.12)' }}>
            <p className="font-display text-[22px] font-extrabold text-red-500 tracking-[-0.5px]">${formatNumber(gapAnual)} MDP</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.5px] text-red-500/60 mt-0.5">Gap anual</p>
          </div>
        </div>
      </div>

      {/* Section: Epidemiologia */}
      <SectionLabel text="Epidemiologia" />

      <div className="grid grid-cols-4 gap-3.5 mb-7">
        <EpiCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>}
          iconBg="rgba(37,99,235,0.12)"
          iconColor="#60a5fa"
          label="Prevalencia Actual"
          value={`${epidemiologia.prevalenciaActualPct.toFixed(2)}%`}
          delta={`+${epidemiologia.deltaPp.toFixed(2)} pp vs 2016`}
          deltaUp
          source="ENCODAT 2025"
        />
        <EpiCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>}
          iconBg="rgba(8,145,178,0.12)"
          iconColor="#22d3ee"
          label="Fumadores Estimados"
          value={formatMillions(epidemiologia.fumadoresEstimados)}
          source="CONAPO + ENCODAT"
        />
        <EpiCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>}
          iconBg="rgba(239,68,68,0.12)"
          iconColor="#f87171"
          label="Muertes Atribuibles/Anio"
          value={formatNumber(epidemiologia.defuncionesAtribuiblesAnual)}
          delta="6.35% de mortalidad total"
          deltaUp
          source="GBD 2023 + INEGI"
        />
        <EpiCard
          icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>}
          iconBg="rgba(249,115,22,0.12)"
          iconColor="#fb923c"
          label="Tendencia Prevalencia"
          value={`+${epidemiologia.deltaPp.toFixed(2)}`}
          delta="puntos porcentuales"
          deltaUp
          source="ENCODAT 2016 → 2025"
          valueColor="#f87171"
        />
      </div>

      {/* CTA */}
      <div className="text-center py-5">
        <button
          onClick={() => navigate('/dashboard/simulador')}
          className="inline-flex items-center gap-2.5 px-9 py-3.5 rounded-[12px] text-[15px] font-bold text-white cursor-pointer transition-transform hover:-translate-y-0.5"
          style={{
            background: 'linear-gradient(135deg, #1d5ce8, #1344c4)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            boxShadow: '0 4px 20px rgba(29,92,232,0.30), inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
        >
          Simular Politicas
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
        <p className="text-[12px] text-[#5580a8] dark:text-white/25 mt-2.5">
          Descubre cuanto podria ahorrar Mexico con nuevas politicas de control del tabaco
        </p>
      </div>

      {/* Sources footer */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-black/[0.06] dark:border-white/[0.04]">
        {['OPS 2025 — Plan Nacional de Desarrollo', 'SHCP — Recaudacion IEPS', 'ENCODAT 2025 — Prevalencia ponderada', 'GBD 2023 + INEGI — Mortalidad', 'CONAPO 2025 — Proyecciones poblacionales'].map(s => (
          <span key={s} className="text-[10px] text-[#5580a8] dark:text-white/20 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---- Helper components ---- */

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3.5">
      <span className="text-[11px] font-bold uppercase tracking-[0.9px] text-[#5580a8] dark:text-white/30">{text}</span>
      <span className="divider-line flex-1 h-px" />
    </div>
  )
}

function GapBar({ label, value, width, color, gradientFrom, gradientTo, last }: {
  label: string; value: number; width: number; color: string
  gradientFrom: string; gradientTo: string; last?: boolean
}) {
  return (
    <div className={last ? '' : 'mb-4'}>
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[13px] font-medium text-[#5580a8] dark:text-white/65">{label}</span>
        <span className="font-display text-[14px] font-bold" style={{ color }}>${formatNumber(value)} MDP</span>
      </div>
      <div className="h-7 rounded-[6px]" style={{ background: 'rgba(0,0,0,0.04)' }}>
        <div
          className="h-full rounded-[6px] animate-fade-up"
          style={{
            width: `${width}%`,
            background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
            boxShadow: `0 0 15px ${gradientTo}`,
          }}
        />
      </div>
    </div>
  )
}

function EpiCard({ icon, iconBg, iconColor, label, value, delta, deltaUp, source, valueColor }: {
  icon: React.ReactNode; iconBg: string; iconColor: string
  label: string; value: string; delta?: string; deltaUp?: boolean
  source: string; valueColor?: string
}) {
  return (
    <div className="metric-card-glass rounded-[18px] p-[18px]">
      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center mb-3" style={{ background: iconBg, color: iconColor }}>
        {icon}
      </div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[#5580a8] dark:text-white/35 mb-1.5">{label}</p>
      <p className="font-display text-[26px] font-extrabold tracking-[-1px] leading-none mb-1" style={{ color: valueColor }}>
        {value}
      </p>
      {delta && (
        <span
          className="inline-flex items-center gap-1 text-[12px] font-semibold px-2 py-0.5 rounded-full"
          style={deltaUp ? {
            background: 'rgba(239,68,68,0.10)',
            color: '#f87171',
            border: '1px solid rgba(239,68,68,0.15)',
          } : {
            background: 'rgba(0,0,0,0.04)',
            color: '#5580a8',
          }}
        >
          {deltaUp && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
          )}
          {delta}
        </span>
      )}
      <p className="text-[10px] text-[#5580a8] dark:text-white/22 mt-2.5">{source}</p>
    </div>
  )
}

/* ---- Formatters ---- */

function formatNumber(n: number): string {
  return n.toLocaleString('es-MX', { maximumFractionDigits: 0 })
}

function formatMillions(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return n.toString()
}
