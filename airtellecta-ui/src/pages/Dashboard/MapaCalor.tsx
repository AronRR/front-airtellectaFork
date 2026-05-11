import { EstadoCard, type EstadoCardProps } from '../../components/EstadoCard/EstadoCard'
import { MapaVulnerabilidad }               from '../../components/MapaVulnerabilidad/MapaVulnerabilidad'
import { RankingEstados }                   from '../../components/RankingEstados/RankingEstados'

const ESTADOS_RIESGO: EstadoCardProps[] = [
  { estado: 'Colima',          consumo: '28.4%', vsNacional: '+9.9pp', poblacion: '198K', riesgo: 'critico' },
  { estado: 'Jalisco',         consumo: '24.1%', vsNacional: '+5.6pp', poblacion: '1.9M', riesgo: 'critico' },
  { estado: 'Ciudad de México',consumo: '22.8%', vsNacional: '+4.3pp', poblacion: '2.1M', riesgo: 'alto'    },
]

export function MapaCalor() {
  return (
    <div className="flex flex-col gap-4" data-testid="mapa-calor">

      {/* ── Fila 1 — Cards de estados críticos ── */}
      <div>
        <p className="text-[13px] font-bold tracking-[0.8px] uppercase text-[#5580a8] dark:text-white/35 mb-1">
          Alerta de consumo
        </p>
        <h2 className="font-display text-[20px] font-extrabold text-[#0c1f3f] dark:text-white mb-4">
          Estados con mayor riesgo
        </h2>
        <div className="grid grid-cols-3 gap-4 max-[900px]:grid-cols-2 max-[580px]:grid-cols-1">
          {ESTADOS_RIESGO.map((e) => (
            <EstadoCard key={e.estado} {...e} />
          ))}
        </div>
      </div>

      {/* ── Fila 2 — Mapa + Ranking ── */}
      <div className="grid grid-cols-2 gap-4">
        <MapaVulnerabilidad />
        <RankingEstados />
      </div>

    </div>
  )
}
