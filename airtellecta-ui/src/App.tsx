import { Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from './pages/Login/LoginPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Dashboard routes will be added here */}
    </Routes>
  )
}
