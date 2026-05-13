const REGIONES = [
  { id: 'nor', label: 'Noroeste', cx: 28, cy: 35, r: 10, color: '#f97316', nivel: 'Alto' },
  { id: 'noe', label: 'Noreste', cx: 56, cy: 28, r: 9,  color: '#eab308', nivel: 'Medio' },
  { id: 'gol', label: 'Golfo',    cx: 72, cy: 42, r: 7,  color: '#84cc16', nivel: 'Bajo' },
  { id: 'cen', label: 'Centro',   cx: 44, cy: 55, r: 13, color: '#ef4444', nivel: 'Muy alto' },
  { id: 'sur', label: 'Sureste',  cx: 62, cy: 65, r: 8,  color: '#eab308', nivel: 'Medio' },
]

const LEGEND = [
  { label: 'Muy alto', color: '#ef4444' },
  { label: 'Alto',     color: '#f97316' },
  { label: 'Medio',    color: '#eab308' },
  { label: 'Bajo',     color: '#84cc16' },
]

export function MapaVulnerabilidad() {
  return (
    <div
      className="metric-card-glass flex flex-col rounded-[18px] overflow-hidden"
      data-testid="mapa-vulnerabilidad"
    >
      <div className="px-5 pt-5 pb-2 shrink-0">
        <p className="text-[13px] font-bold tracking-[0.8px] text-[#5580a8] uppercase dark:text-white/35">
          Mapa de Vulnerabilidad
        </p>
        <p className="text-[20px] font-semibold text-[#0c1f3f] dark:text-white">
          Índice de riesgo por región
        </p>
      </div>

      <div className="px-4 pb-1 shrink-0">
        <div className="relative w-full" style={{ aspectRatio: '16 / 9' }}>
          <svg
            viewBox="12 15 76 65"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse
              cx="50" cy="50" rx="40" ry="28"
              fill="rgba(37,99,235,0.05)"
              stroke="rgba(37,99,235,0.25)"
              strokeWidth="0.6"
            />
            {REGIONES.map((r) => (
              <g key={r.id}>
                <circle cx={r.cx} cy={r.cy} r={r.r + 3} fill={r.color} fillOpacity="0.15" />
                <circle cx={r.cx} cy={r.cy} r={r.r}     fill={r.color} fillOpacity="0.85" />
                <circle
                  cx={r.cx - r.r * 0.25}
                  cy={r.cy - r.r * 0.28}
                  r={r.r * 0.35}
                  fill="white"
                  fillOpacity="0.25"
                />
                <text
                  x={r.cx}
                  y={r.cy + r.r + 4}
                  textAnchor="middle"
                  fontSize="3.2"
                  fill="currentColor"
                  fillOpacity="0.6"
                  className="text-slate-600 dark:text-white"
                >
                  {r.label}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-center gap-5 px-5 pb-4 pt-2 shrink-0">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.color }} />
            <span className="text-[11px] text-[#5580a8] dark:text-white/40">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}