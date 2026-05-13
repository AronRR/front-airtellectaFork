interface VerificationBadgeProps {
  nivel: string
}

const BADGE_CONFIG: Record<string, { bg: string; text: string; border: string; label: string; showIcon: boolean }> = {
  INTERPOLADO: {
    bg: 'rgba(234,179,8,0.10)',
    text: '#eab308',
    border: 'rgba(234,179,8,0.20)',
    label: 'Estimado',
    showIcon: false,
  },
  PRELIMINAR: {
    bg: 'rgba(249,115,22,0.10)',
    text: '#f97316',
    border: 'rgba(249,115,22,0.20)',
    label: 'Preliminar',
    showIcon: false,
  },
  ESTIMACION_PRENSA: {
    bg: 'rgba(239,68,68,0.12)',
    text: '#f87171',
    border: 'rgba(239,68,68,0.25)',
    label: 'No oficial',
    showIcon: true,
  },
}

export function VerificationBadge({ nivel }: VerificationBadgeProps) {
  const config = BADGE_CONFIG[nivel]
  if (!config) return null

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.5px]"
      style={{
        background: config.bg,
        color: config.text,
        border: `1px solid ${config.border}`,
      }}
    >
      {config.showIcon && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      )}
      {config.label}
    </span>
  )
}
