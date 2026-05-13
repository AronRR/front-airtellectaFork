import { NavLink, useNavigate } from 'react-router-dom'


const LogoIcon = () => (
  <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
    <path d="M20 7L5 14.5L20 22L35 14.5L20 7Z" fill="white" fillOpacity="0.95" />
    <path d="M5 20L20 27.5L35 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 25.5L20 33L35 25.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5" />
  </svg>
)

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

const MapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1,6 1,22 8,18 16,22 23,18 23,2 16,6 8,2" />
    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
)

const TrendingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" />
  </svg>
)

const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20V10" /><path d="M18 20V4" /><path d="M6 20v-4" />
  </svg>
)

const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </svg>
)

const PulseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16,17 21,12 16,7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

// ── Nav items ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Resumen Nacional', path: '/dashboard',                 icon: <GridIcon />,     end: true  },
  { label: 'Mapa de Calor',    path: '/dashboard/mapa',            icon: <MapIcon />,      end: false },
  { label: 'Panel Ejecutivo',  path: '/dashboard/panel-ejecutivo', icon: <BarChartIcon />, end: false },
  { label: 'Costos Patología', path: '/dashboard/costos',          icon: <DollarIcon />,   end: false },
  { label: 'Tendencias',       path: '/dashboard/tendencias',      icon: <TrendingIcon />, end: false },
  { label: 'Simulador',        path: '/dashboard/simulador',       icon: <PulseIcon />,    end: false },
]

// ── Component ──────────────────────────────────────────────────────────────

export function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside
      className="sidebar-glass group w-[72px] hover:w-[220px] flex flex-col items-center rounded-[24px] pt-[10px] pb-4 relative z-10 overflow-hidden transition-[width] duration-[250ms] ease-in-out"
      data-testid="sidebar"
    >
      {/* Logo */}
      <div className="w-full h-[62px] flex items-center justify-center shrink-0 border-b border-white/[0.07] mb-2">
        <div className="sidebar-logo-glass w-[42px] h-[42px] rounded-[13px] flex items-center justify-center">
          <LogoIcon />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col items-stretch gap-1 py-1 pl-2 w-full">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            title={item.label}
            className={({ isActive }) =>
              `relative w-full h-[46px] flex items-center justify-start pl-[22px] gap-[14px] rounded-[13px] no-underline border-none cursor-pointer font-sans transition-colors duration-[180ms] ${
                isActive
                  ? 'nav-item-active'
                  : 'bg-transparent text-white/40 hover:text-white/75 hover:bg-white/[0.08]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="flex items-center justify-center shrink-0 w-[18px] h-[18px]">
                  {item.icon}
                </span>
                <span className={`opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-[200ms] text-[17.5px] font-semibold ${isActive ? 'text-[#0c1f3f] dark:text-[#93c5fd]' : 'text-white/85'}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="flex flex-col items-center px-2.5 w-full border-t border-white/[0.07] pt-3 mt-2">
        <button
          className="w-full h-[46px] flex items-center justify-start pl-[22px] gap-[14px] rounded-[13px] border-none bg-transparent cursor-pointer font-sans text-white/35 hover:text-[#f87171] hover:bg-[rgba(248,113,113,0.10)] transition-colors duration-[180ms]"
          type="button"
          title="Cerrar sesión"
          onClick={() => navigate('/login')}
          data-testid="sidebar-logout"
        >
          <LogoutIcon />
          <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity duration-[200ms] text-[17.5px] font-semibold text-white/85">
            Cerrar sesión
          </span>
        </button>
      </div>
    </aside>
  )
}
