import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCostos } from '../../services/api'
import type { CostoCie10 } from '../../types/api'

const PATOLOGIA_NAMES: Record<string, string> = {
  C34: 'Cancer de Pulmon',
  I21: 'Infarto Agudo de Miocardio',
  J44: 'Enfermedad Pulmonar Obstructiva Cronica (EPOC)',
}

const SOURCE_COLORS: Record<string, { fill: string; glow: string; text: string }> = {
  'Reynales-Shigematsu 2005': {
    fill: 'linear-gradient(90deg, rgba(59,130,246,0.55), rgba(37,99,235,0.30))',
    glow: '0 0 15px rgba(59,130,246,0.10)',
    text: '#93c5fd',
  },
  'Saenz-de-Miera 2024': {
    fill: 'linear-gradient(90deg, rgba(139,92,246,0.55), rgba(124,58,237,0.30))',
    glow: '0 0 15px rgba(139,92,246,0.10)',
    text: '#c4b5fd',
  },
}

function getSourceKey(fuente: string): string {
  if (fuente.includes('Reynales')) return 'Reynales-Shigematsu 2005'
  if (fuente.includes('Saenz') || fuente.includes('aenz')) return 'Saenz-de-Miera 2024'
  return fuente
}

export function CostosPatologia() {
  const [costos, setCostos] = useState<CostoCie10[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    getCostos()
      .then(res => {
        if (res.success) setCostos(res.data)
        else setError(res.error ?? 'Error desconocido')
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-[14px] text-[#5580a8] dark:text-white/40">Cargando costos...</p>
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

  if (!costos) return null

  // Group by codigo
  const grouped: Record<string, CostoCie10[]> = {}
  for (const c of costos) {
    if (!grouped[c.codigo]) grouped[c.codigo] = []
    grouped[c.codigo].push(c)
  }

  const maxCost = Math.max(...costos.map(c => c.costoAjustado2025))
  const maxItem = costos.reduce((a, b) => a.costoAjustado2025 > b.costoAjustado2025 ? a : b)

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[11px] uppercase tracking-[0.9px] text-[#5580a8] dark:text-white/35 mb-1.5">
          Airtellecta &rsaquo; Panel Ejecutivo &rsaquo; Costos
        </p>
        <h1 className="font-display text-[22px] font-extrabold tracking-[-0.3px] text-[#0c1f3f] dark:text-white/95">
          Costos por Patologia
        </h1>
        <p className="text-[14px] text-[#5580a8] dark:text-white/35 mt-1.5 max-w-[600px] leading-relaxed">
          Costo de atencion por paciente para las principales enfermedades atribuibles al tabaco, segun dos estudios independientes.
        </p>
      </div>

      {/* Insight card */}
      <div className="metric-card-glass rounded-[18px] p-5 mb-6 flex items-center gap-4" style={{ borderLeft: '4px solid #f97316' }}>
        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ background: 'rgba(249,115,22,0.10)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
        </div>
        <p className="text-[14px] text-[#5580a8] dark:text-white/65 leading-relaxed">
          Cada paciente con <strong className="text-orange-400 font-bold">{PATOLOGIA_NAMES[maxItem.codigo]?.toLowerCase() ?? maxItem.trastorno}</strong> cuesta hasta{' '}
          <strong className="text-orange-400 font-bold">${formatNumber(maxItem.costoAjustado2025)}</strong> al sistema de salud.
        </p>
      </div>

      {/* Legend */}
      <div className="flex gap-6 mb-5 py-3">
        <LegendItem color="linear-gradient(135deg, #3b82f6, #2563eb)" label="Reynales-Shigematsu 2005 (ajustado INPC 2025)" />
        <LegendItem color="linear-gradient(135deg, #8b5cf6, #7c3aed)" label="Saenz-de-Miera 2024 (pesos 2020)" />
      </div>

      {/* Patologia cards */}
      {Object.entries(grouped).map(([codigo, items]) => {
        const maxInGroup = Math.max(...items.map(i => i.costoAjustado2025))
        return (
          <div key={codigo} className="mb-4">
            <SectionLabel text={`CIE-10: ${codigo}`} />
            <div className="metric-card-glass rounded-[18px] p-6 hover:-translate-y-0.5 transition-transform">
              {/* Header */}
              <div className="flex justify-between items-start mb-[18px]">
                <div>
                  <p className="font-display text-[13px] font-bold text-[#5580a8] dark:text-white/30 tracking-[0.5px] mb-1">{codigo}</p>
                  <p className="text-[17px] font-bold dark:text-white/90">{PATOLOGIA_NAMES[codigo] ?? items[0].trastorno}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.5px] text-[#5580a8] dark:text-white/25 mb-0.5">Costo maximo</p>
                  <p className="font-display text-[24px] font-extrabold tracking-[-0.8px] dark:text-white/85">
                    ${formatNumber(maxInGroup)}<span className="text-[12px] font-semibold opacity-50"> /pac</span>
                  </p>
                </div>
              </div>

              {/* Bars */}
              <div className="flex flex-col gap-2.5">
                {items.map((item, i) => {
                  const sourceKey = getSourceKey(item.fuente)
                  const colors = SOURCE_COLORS[sourceKey] ?? SOURCE_COLORS['Reynales-Shigematsu 2005']
                  const barWidth = (item.costoAjustado2025 / maxCost) * 100
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-[11px] font-semibold text-[#5580a8] dark:text-white/40 w-[110px] text-right shrink-0">
                        {sourceKey.split(' ')[0]} {item.anioBase}
                      </span>
                      <div className="flex-1 h-8 rounded-lg" style={{ background: 'rgba(0,0,0,0.04)' }}>
                        <div
                          className="h-full rounded-lg flex items-center pl-3 text-[13px] font-bold animate-fade-up"
                          style={{
                            width: `${barWidth}%`,
                            background: colors.fill,
                            boxShadow: colors.glow,
                            color: colors.text,
                          }}
                        >
                          ${formatNumber(item.costoAjustado2025)}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Meta */}
              <div className="flex gap-4 mt-1.5 pl-[122px]">
                {items.map((item, i) => (
                  <span key={i} className="text-[10px] text-[#5580a8] dark:text-white/22">
                    Base: pesos {item.anioBase}, factor {item.factorInflacion.toFixed(2)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      {/* Navigation CTAs */}
      <div className="flex justify-between items-center mt-7 pt-5 border-t border-black/[0.06] dark:border-white/[0.04]">
        <button onClick={() => navigate('/dashboard/panel-ejecutivo')} className="flex items-center gap-2 text-[13px] font-semibold text-[#5580a8] dark:text-white/40 hover:text-white/70 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          Panel Ejecutivo
        </button>
        <button
          onClick={() => navigate('/dashboard/tendencias')}
          className="flex items-center gap-2 text-[13px] font-semibold text-blue-400 px-5 py-2.5 rounded-[10px] transition-colors"
          style={{ background: 'linear-gradient(135deg, rgba(29,92,232,0.15), rgba(19,68,196,0.10))', border: '1px solid rgba(29,92,232,0.20)' }}
        >
          Esta empeorando? Ver Tendencias
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </button>
      </div>

      {/* Sources */}
      <div className="flex flex-wrap gap-4 mt-5">
        {['Reynales-Shigematsu, Salud Publica Mex 2005 — pesos 2001, INPC 3.87', 'Saenz-de-Miera, Health Policy & Planning 2024 — Table A2, pesos 2020', 'Banxico INPC subindice alimentos/bebidas/tabaco'].map(s => (
          <span key={s} className="text-[10px] text-[#5580a8] dark:text-white/18 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-current opacity-60" />
            {s}
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

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2 text-[12px] text-[#5580a8] dark:text-white/50 font-medium">
      <div className="w-3 h-3 rounded" style={{ background: color }} />
      {label}
    </div>
  )
}

function formatNumber(n: number): string {
  return n.toLocaleString('es-MX', { maximumFractionDigits: 0 })
}
