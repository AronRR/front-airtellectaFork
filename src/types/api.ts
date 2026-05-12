// ============================================================
// API Response Types — match backend DTOs 1:1
// Backend: com.airtellecta.dto.*
// ============================================================

// --- Wrapper comun (com.airtellecta.dto.ApiResponse) ---

export interface ApiResponse<T> {
  success: boolean
  data: T
  error?: string
}

// --- Resumen Nacional (com.airtellecta.dto.response.ResumenNacionalDto) ---

export interface ResumenNacional {
  prevalenciaFumadores: number
  poblacionFumadores: number
  usuariosVapeo: number
  usoDual: number
  defuncionesF17: number
  urgenciasF17: number
  poblacionTotal: number
}

// --- Mapa Estatal (com.airtellecta.dto.response.EntidadPrevalenciaDto) ---

export interface EntidadPrevalencia {
  cveEntidad: number
  nombre: string
  abreviatura: string
  fumadoresEstimados: number
  pobTotal: number
  tasa100k: number
  prevalencia: number
}

// --- Mortalidad (com.airtellecta.dto.response.MortalidadDto) ---

export interface SerieAnual {
  anio: number
  defunciones: number
  urgencias: number
  defuncionesF17: number
  urgenciasF17: number
}

export interface DesgloseCie10 {
  codigo: string
  trastorno: string
  totalDefunciones: number
  totalUrgencias: number
}

export interface MortalidadData {
  series: SerieAnual[]
  desgloseCie10: DesgloseCie10[]
}

// --- Tendencias (com.airtellecta.dto.response.TendenciasDto) ---

export interface TendenciasData {
  prevalencia2016: number
  prevalencia2025: number
  deltaPp: number
  fumadores2016: number
  fumadores2025: number
  vapeo2016: number
  vapeo2025: number
  dual2016: number
  dual2025: number
}

// --- Costos (com.airtellecta.dto.response.CostoCie10Dto) ---

export interface CostoCie10 {
  codigo: string
  trastorno: string
  costoPorPaciente: number
  costoAjustado2025: number
  anioBase: number
  factorInflacion: number
  fuente: string
  fuenteDoi: string
}

// --- Recaudacion (com.airtellecta.dto.response.RecaudacionAnualDto) ---

export interface RecaudacionAnual {
  anio: number
  montoMdp: number
  fuente: string
}

// --- Panel Ejecutivo (com.airtellecta.dto.response.PanelEjecutivoDto) ---

export interface FuenteDato {
  campo: string
  fuente: string
  fuenteUrl: string
  anioReferencia: number
  nivelVerificacion: string
}

export interface CargaEconomica {
  costoDirectoAnualMdp: number
  costoSocialAnualMdp: number
  inversionPrevencionMdp: number
  fuentes: FuenteDato[]
}

export interface RecaudacionPanel {
  iepsMasRecienteMdp: number
  anio: number
  fuente: string
  fuenteUrl: string
  nivelVerificacion: string
}

export interface EpidemiologiaPanel {
  prevalenciaActualPct: number
  prevalenciaHistoricaPct: number
  deltaPp: number
  fumadoresEstimados: number
  defuncionesAtribuiblesAnual: number
  poblacion18Plus: number
  fuentes: FuenteDato[]
}

export interface CostoPatologia {
  codigo: string
  trastorno: string
  costoAjustado2025: number
  anioBase: number
  fuente: string
  fuenteDoi: string
}

export interface PanelEjecutivo {
  cargaEconomica: CargaEconomica
  recaudacion: RecaudacionPanel
  epidemiologia: EpidemiologiaPanel
  costosPorPatologia: CostoPatologia[]
}

// --- Simulacion (com.airtellecta.dto.SimulacionRequestDto + response.*) ---

export interface SimulacionRequest {
  politicas?: string[]
  impuestoPctPrecio?: number
  horizonteAnios?: number
}

export interface ParametrosBase {
  prevalenciaBasePct: number
  poblacion18Plus: number
  fumadoresBase: number
  defuncionesAtribuiblesBase: number
  impuestoActualPctPrecio: number
}

export interface ProyeccionAnual {
  anio: number
  prevalenciaPct: number
  fumadoresAbsolutos: number
  defuncionesEvitadas: number
  ahorroMdp: number
}

export interface ResumenFinal {
  prevalenciaFinalPct: number
  reduccionPuntosPct: number
  fumadoresEvitadosTotal: number
  defuncionesEvitadasTotal: number
  ahorroAcumuladoMdp: number
}

export interface PoliticaAplicada {
  clave: string
  nombre: string
  efectoPct: number
}

export interface ElasticidadesAplicadas {
  impuestoNuevoPctPrecio: number
  incrementoPrecioPct: number
  efectoPromedioPct: number
}

export interface SimulacionResultado {
  parametrosBase: ParametrosBase
  proyeccion: ProyeccionAnual[]
  resumenFinal: ResumenFinal
  politicasAplicadas: PoliticaAplicada[]
  elasticidadesAplicadas: ElasticidadesAplicadas
}
