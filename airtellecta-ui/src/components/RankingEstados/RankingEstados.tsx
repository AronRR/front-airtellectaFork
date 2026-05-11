const ESTADOS = [
  { rank: 1, nombre: 'Colima',           valor: 28.4, widthClass: 'w-full',   colorClass: 'bg-red-500',    riesgo: 'critico' },
  { rank: 2, nombre: 'Jalisco',           valor: 24.1, widthClass: 'w-[85%]', colorClass: 'bg-red-400',    riesgo: 'critico' },
  { rank: 3, nombre: 'Ciudad de México',  valor: 22.8, widthClass: 'w-[80%]', colorClass: 'bg-orange-500', riesgo: 'critico' },
  { rank: 4, nombre: 'Nuevo León',        valor: 20.4, widthClass: 'w-[72%]', colorClass: 'bg-orange-400', riesgo: 'alto'    },
  { rank: 5, nombre: 'Baja California',   valor: 18.7, widthClass: 'w-[66%]', colorClass: 'bg-amber-400',  riesgo: 'alto'    },
  { rank: 6, nombre: 'Estado de México',  valor: 17.3, widthClass: 'w-[61%]', colorClass: 'bg-amber-400',  riesgo: 'alto'    },
  { rank: 7, nombre: 'Querétaro',         valor: 16.1, widthClass: 'w-[57%]', colorClass: 'bg-yellow-400', riesgo: 'medio'   },
  { rank: 8, nombre: 'Puebla',            valor: 15.0, widthClass: 'w-[53%]', colorClass: 'bg-yellow-400', riesgo: 'medio'   },
]

const ROW_BG: Record<string, string> = {
  critico: 'bg-red-500/8 dark:bg-red-500/10 rounded-[10px]',
  alto:    '',
  medio:   '',
}

const VALUE_COLOR: Record<string, string> = {
  critico: 'text-red-600 dark:text-red-400 font-bold',
  alto:    'text-orange-600 dark:text-orange-400 font-semibold',
  medio:   'text-[#0c1f3f] dark:text-white font-semibold',
}

export function RankingEstados() {
  return (
    <div className="metric-card-glass flex flex-col gap-4 p-5 rounded-[18px] h-full" data-testid="ranking-estados">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-bold tracking-[0.8px] uppercase text-[#5580a8] dark:text-white/35">
            Ranking de Estados
          </p>
          <p className="text-[20px] font-semibold text-[#0c1f3f] dark:text-white">
            Ordenado por consumo
          </p>
        </div>
        <span className="text-[12px] text-[#5580a8] dark:text-white/40 mt-1">de 32 ↓</span>
      </div>

      {/* Lista */}
      <div className="flex flex-col gap-1">
        {ESTADOS.map((e) => (
          <div
            key={e.rank}
            className={`flex items-center gap-3 px-2 py-2 ${ROW_BG[e.riesgo]}`}
            data-testid={`ranking-row-${e.rank}`}
          >
            {/* Rank */}
            <span className={`text-[13px] w-4 shrink-0 ${e.rank <= 3 ? 'font-bold text-[#0c1f3f] dark:text-white' : 'text-[#5580a8] dark:text-white/30'}`}>
              {e.rank}
            </span>

            {/* Nombre + barra */}
            <div className="flex-1 min-w-0">
              <p className={`text-[13px] mb-1 truncate ${e.rank <= 3 ? 'font-semibold text-[#0c1f3f] dark:text-white' : 'text-[#3a5a80] dark:text-white/60'}`}>
                {e.nombre}
              </p>
              <div className="h-1.5 rounded-full bg-[rgba(180,210,240,0.20)] dark:bg-white/[0.06] overflow-hidden">
                <div className={`h-full rounded-full ${e.widthClass} ${e.colorClass}`} />
              </div>
            </div>

            {/* Valor */}
            <span className={`text-[14px] shrink-0 tabular-nums ${VALUE_COLOR[e.riesgo]}`}>
              {e.valor}%
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <button
        className="mt-auto text-[13px] font-semibold text-[#2563eb] dark:text-[#93c5fd] hover:underline cursor-pointer bg-transparent border-none text-center w-full"
        type="button"
        data-testid="btn-ver-todos"
      >
        Ver los 32 estados ↓
      </button>
    </div>
  )
}
