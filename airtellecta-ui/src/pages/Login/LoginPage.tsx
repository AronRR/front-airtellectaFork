import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'


const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const LayersIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 7L5 14.5L20 22L35 14.5L20 7Z" fill="white" fillOpacity="0.9" />
    <path d="M5 20L20 27.5L35 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 25.5L20 33L35 25.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.6" />
  </svg>
)

function useTypewriter(text: string, speed = 80, delay = 300) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1))
        i++
        if (i >= text.length) clearInterval(interval)
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return displayed
}

export function LoginPage() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const titulo = useTypewriter('AIRTELLECTA', 75, 350)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!usuario.trim() || !password) {
      setError('Por favor completa todos los campos.')
      return
    }

    setError('')
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      navigate('/dashboard')
    } catch {
      setError('Credenciales incorrectas. Verifica tu usuario y contraseña.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <div className="login-logo-box">
          <LayersIcon />
        </div>

        <h1 className="login-title">
          {titulo}
          <span className="login-cursor">|</span>
        </h1>

        <p className="login-sub1">Plataforma de Inteligencia Epidemiológica</p>
        <p className="login-sub2">Sistema de Análisis de Salud Pública</p>
      </header>

      <form className="login-card" onSubmit={handleSubmit} noValidate>
        {error && <div className="login-error">{error}</div>}

        <div className="login-field">
          <label className="login-label">Usuario</label>
          <div className="login-input-wrap">
            <span className="login-input-icon">
              <UserIcon />
            </span>
            <input
              className="login-input"
              type="text"
              placeholder="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>
        </div>

        <div className="login-field">
          <label className="login-label">Contraseña</label>
          <div className="login-input-wrap">
            <span className="login-input-icon">
              <LockIcon />
            </span>
            <input
              className="login-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Verificando...' : 'Acceder al Sistema'}
        </button>

        <p className="login-security-note">Sistema seguro · Acceso autorizado únicamente</p>
      </form>

      <footer className="login-footer">
        <p>© 2026 INTELLECTA · Todos los derechos reservados</p>
      </footer>
    </div>
  )
}