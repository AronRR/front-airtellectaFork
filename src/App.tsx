import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'
import { DashboardLayout } from './pages/Dashboard/DashboardLayout'
import { ResumenNacional } from './pages/Dashboard/ResumenNacional'
import { MapaCalor } from './pages/Dashboard/MapaCalor'
import { PanelEjecutivo } from './pages/Dashboard/PanelEjecutivo'
import { CostosPatologia } from './pages/Dashboard/CostosPatologia'
import { Tendencias } from './pages/Dashboard/Tendencias'
import { Simulador } from './pages/Dashboard/Simulador'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<ResumenNacional />} />
        <Route path="mapa" element={<MapaCalor />} />
        <Route path="panel-ejecutivo" element={<PanelEjecutivo />} />
        <Route path="costos" element={<CostosPatologia />} />
        <Route path="tendencias" element={<Tendencias />} />
        <Route path="simulador" element={<Simulador />} />
      </Route>
    </Routes>
  )
}
