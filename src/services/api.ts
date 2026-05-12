import axios from 'axios'
import type {
  ApiResponse,
  ResumenNacional,
  EntidadPrevalencia,
  MortalidadData,
  TendenciasData,
  CostoCie10,
  RecaudacionAnual,
  PanelEjecutivo,
  SimulacionRequest,
  SimulacionResultado,
} from '../types/api'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

export async function getPing(): Promise<ApiResponse<string>> {
  const { data } = await api.get<ApiResponse<string>>('/api/ping')
  return data
}

export async function getResumenNacional(): Promise<ApiResponse<ResumenNacional>> {
  const { data } = await api.get<ApiResponse<ResumenNacional>>('/api/resumen-nacional')
  return data
}

export async function getMapaEstatal(sexo?: number): Promise<ApiResponse<EntidadPrevalencia[]>> {
  const { data } = await api.get<ApiResponse<EntidadPrevalencia[]>>('/api/mapa-estatal', {
    params: sexo != null ? { sexo } : undefined,
  })
  return data
}

export async function getMortalidad(): Promise<ApiResponse<MortalidadData>> {
  const { data } = await api.get<ApiResponse<MortalidadData>>('/api/mortalidad')
  return data
}

export async function getTendencias(): Promise<ApiResponse<TendenciasData>> {
  const { data } = await api.get<ApiResponse<TendenciasData>>('/api/tendencias')
  return data
}

export async function getCostos(): Promise<ApiResponse<CostoCie10[]>> {
  const { data } = await api.get<ApiResponse<CostoCie10[]>>('/api/costos')
  return data
}

export async function getRecaudacion(): Promise<ApiResponse<RecaudacionAnual[]>> {
  const { data } = await api.get<ApiResponse<RecaudacionAnual[]>>('/api/recaudacion')
  return data
}

export async function getPanelEjecutivo(): Promise<ApiResponse<PanelEjecutivo>> {
  const { data } = await api.get<ApiResponse<PanelEjecutivo>>('/api/panel-ejecutivo')
  return data
}

export async function postSimulacion(body: SimulacionRequest): Promise<ApiResponse<SimulacionResultado>> {
  const { data } = await api.post<ApiResponse<SimulacionResultado>>('/api/simulacion', body)
  return data
}
