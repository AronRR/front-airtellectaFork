import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './DashboardLayout.css'

// ── Icons ──────────────────────────────────────────────────────────────────

const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
    <path d="M20 7L5 14.5L20 22L35 14.5L20 7Z" fill="white" fillOpacity="0.95" />
    <path d="M5 20L20 27.5L35 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 25.5L20 33L35 25.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
  </svg>
)

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
)

const TrendingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
)

const CampaignIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l18-5v12L3 14v-3z" />
    <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
  </svg>
)

const DatabaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const ChevronsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 9l4-4 4 4M8 15l4 4 4-4" />
  </svg>
)

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const BellIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6,9 12,15 18,9" />
  </svg>
)

const CheckIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20,6 9,17 4,12" />
  </svg>
)

const SettingsIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const AppearanceIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const AlertTriangleIcon = () => (
  <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const SearchPanelIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="21" y1="6" x2="3" y2="6" />
    <line x1="17" y1="12" x2="7" y2="12" />
    <line x1="13" y1="18" x2="11" y2="18" />
  </svg>
)

const LogoutMenuIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const InfoIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
)

const SunIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)

const MoonIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const MonitorIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
)

//Paneles del header (notificaciones y alertas)
type PanelVariant = 'notifications' | 'alerts'

function HeaderPanel({ variant }: { variant: PanelVariant }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isNotif = variant === 'notifications'

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div className="panel-wrap" ref={ref}>
      <button
        className={`icon-btn${open ? ' icon-btn--open' : ''}`}
        type="button"
        aria-label={isNotif ? 'Notificaciones' : 'Alertas'}
        onClick={() => setOpen((v) => !v)}
      >
        {isNotif ? <BellIcon /> : <AlertTriangleIcon />}
        <span className="icon-btn-badge" />
      </button>

      {open && (
        <div className="panel-dropdown">
          {/* Header del panel */}
          <div className="panel-header">
            <h3 className="panel-title">{isNotif ? 'Notificaciones' : 'Alertas'}</h3>
            <button className="panel-settings-btn" type="button" aria-label="Configuración">
              <SettingsIcon />
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="panel-search-row">
            <label className="panel-search">
              <SearchPanelIcon />
              <input className="panel-search-input" placeholder="Buscar" />
            </label>
            <button className="panel-filter-btn" type="button" aria-label="Filtrar">
              <FilterIcon />
            </button>
          </div>

          {/* Estado vacío */}
          <div className="panel-empty">
            {isNotif ? (
              <p className="panel-empty-text">Sin notificaciones</p>
            ) : (
              <>
                <p className="panel-empty-text">
                  Tus alertas de consumo<br />aparecerán aquí.
                </p>
                <button className="panel-create-btn" type="button">
                  Crear alerta
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


function ConfigModal({ onClose }: { onClose: () => void }) {
  const [displayName, setDisplayName] = useState('Usuario')

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="config-modal" onClick={(e) => e.stopPropagation()}>

        <div className="config-modal-header">
          <h2 className="config-modal-title">Configuración de cuenta</h2>
          <button className="modal-close-btn" type="button" onClick={onClose}>
            <XIcon />
          </button>
        </div>

        <div className="config-modal-body">
          {/* Perfil */}
          <div className="config-section">
            <h3 className="config-section-title">Perfil</h3>

            <div className="config-field">
              <label className="config-label">Nombre de usuario</label>
              <input
                className="config-input"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Tu nombre"
              />
            </div>

            <div className="config-field">
              <label className="config-label">Rol</label>
              <input className="config-input config-input--readonly" value="Cargo" readOnly />
              <span className="config-hint">Asignado por el administrador del sistema</span>
            </div>
          </div>

          {/* Seguridad */}
          <div className="config-section">
            <h3 className="config-section-title">Seguridad</h3>
            <div className="config-notice">
              <span className="config-notice-icon"><InfoIcon /></span>
              <p>El cambio de contraseña en este sistema requiere autorización de un administrador. Contacta al responsable de tu institución para realizar esta solicitud.</p>
            </div>
          </div>
        </div>

        <div className="config-modal-footer">
          <button className="config-cancel-btn" type="button" onClick={onClose}>Cancelar</button>
          <button className="config-save-btn" type="button">Guardar cambios</button>
        </div>
      </div>
    </div>
  )
}


type Theme = 'light' | 'dark' | 'auto'

const THEME_LABELS: Record<Theme, string> = { light: 'Claro', dark: 'Oscuro', auto: 'Auto' }
const THEME_OPTIONS: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Claro',   icon: <SunIcon /> },
  { value: 'dark',  label: 'Oscuro',  icon: <MoonIcon /> },
  { value: 'auto',  label: 'Auto',    icon: <MonitorIcon /> },
]

function applyTheme(t: Theme) {
  const isDark = t === 'dark' || (t === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches)
  document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
}

function UserMenu() {
  const [open, setOpen] = useState(false)
  const [showConfig, setShowConfig] = useState(false)
  const [showAppearance, setShowAppearance] = useState(false)
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('airtellecta-theme') as Theme) ?? 'auto'
  })
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Apply theme on mount + change
  useEffect(() => {
    applyTheme(theme)
    localStorage.setItem('airtellecta-theme', theme)
    if (theme !== 'auto') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('auto')
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [theme])

  // Click outside to close dropdown
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <>
      <div className="user-menu-wrap" ref={ref}>
        <button
          className={`user-info${open ? ' user-info--open' : ''}`}
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <div className="user-details">
            <span className="user-name">Usuario</span>
            <span className="user-role">Cargo</span>
          </div>
          <div className="user-avatar">US</div>
          <ChevronDownIcon />
        </button>

        {open && (
          <div className="user-dropdown">
            {/* Identidad */}
            <div className="dropdown-section">
              <div className="dropdown-identity">
                <span className="dropdown-check"><CheckIcon /></span>
                <div>
                  <p className="dropdown-identity-name">Usuario</p>
                  <p className="dropdown-identity-id">ID-AIRTELLECTA</p>
                </div>
              </div>
            </div>

            <div className="dropdown-divider" />

            {/* Acciones */}
            <div className="dropdown-section">
              <button
                className="dropdown-item"
                type="button"
                onClick={() => { setOpen(false); setShowConfig(true) }}
              >
                <SettingsIcon />
                Configuración
              </button>

              {/* Apariencia expandible */}
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setShowAppearance((v) => !v)}
              >
                <AppearanceIcon />
                Apariencia
                <span className="dropdown-item-badge">{THEME_LABELS[theme]}</span>
              </button>

              {showAppearance && (
                <div className="appearance-options">
                  {THEME_OPTIONS.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      className={`appearance-option${theme === value ? ' appearance-option--active' : ''}`}
                      type="button"
                      onClick={() => setTheme(value)}
                    >
                      {icon}
                      {label}
                      {theme === value && <span className="appearance-check"><CheckIcon /></span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="dropdown-divider" />

            {/* Cerrar sesión */}
            <div className="dropdown-section">
              <button
                className="dropdown-item dropdown-item--danger"
                type="button"
                onClick={() => navigate('/login')}
              >
                <LogoutMenuIcon />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}
      </div>

      {showConfig && createPortal(
        <ConfigModal onClose={() => setShowConfig(false)} />,
        document.body
      )}
    </>
  )
}

// ── Nav items ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Resumen Nacional', path: '/dashboard',            icon: <GridIcon />,     end: true  },
  { label: 'Mapa de Calor',    path: '/dashboard/mapa',       icon: <MapIcon />,      end: false },
  { label: 'Tendencias',       path: '/dashboard/tendencias', icon: <TrendingIcon />, end: false },
  { label: 'Campañas',         path: '/dashboard/campanas',   icon: <CampaignIcon />, end: false },
  { label: 'Fuentes',          path: '/dashboard/fuentes',    icon: <DatabaseIcon />, end: false },
]

// ── Layout ─────────────────────────────────────────────────────────────────

export function DashboardLayout() {
  return (
    <div className="dashboard-layout">

      {/* ── Sidebar  */}
      <aside className="dashboard-sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-logo-box">
            <LogoIcon />
          </div>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              title={item.label}
              className={({ isActive }) =>
                `nav-item${isActive ? ' nav-item--active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout(fondo) */}
        <div className="sidebar-bottom">
          <button className="nav-item logout-btn" type="button" title="Cerrar sesión">
            <LogoutIcon />
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="dashboard-main">

        {/* ── Header ── */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="period-selector" type="button">
              <CalendarIcon />
              <span>++Definir+++</span>
              <ChevronsIcon />
            </button>
          </div>

          <div className="header-center">
            <button className="export-btn" type="button">
              <DownloadIcon />
              Exportar Reporte
            </button>
          </div>

          <div className="header-right">
            <HeaderPanel variant="alerts" />
            <HeaderPanel variant="notifications" />
            <UserMenu />
          </div>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
