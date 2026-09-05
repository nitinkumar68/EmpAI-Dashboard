const deptColors = {
  Engineering: { bg: 'rgba(99,102,241,0.15)', color: '#818CF8' },
  Marketing:   { bg: 'rgba(236,72,153,0.15)', color: '#F472B6' },
  HR:          { bg: 'rgba(34,197,94,0.15)',  color: '#4ADE80' },
  Finance:     { bg: 'rgba(245,158,11,0.15)', color: '#FCD34D' },
  Design:      { bg: 'rgba(20,184,166,0.15)', color: '#2DD4BF' },
  Operations:  { bg: 'rgba(249,115,22,0.15)', color: '#FB923C' },
  Product:     { bg: 'rgba(139,92,246,0.15)', color: '#A78BFA' },
}

const statusColors = {
  active:   { bg: 'rgba(34,197,94,0.15)',  color: '#4ADE80' },
  inactive: { bg: 'rgba(100,116,139,0.15)', color: '#94A3B8' },
}

export default function Badge({ label, type = 'dept', size = 'sm' }) {
  const colors = type === 'status'
    ? statusColors[label] || statusColors.inactive
    : deptColors[label] || { bg: 'rgba(99,102,241,0.15)', color: '#818CF8' }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: size === 'sm' ? '3px 8px' : '5px 12px',
        borderRadius: 9999,
        fontSize: size === 'sm' ? 11 : 13,
        fontWeight: 600,
        letterSpacing: '0.03em',
        background: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.color}33`,
        whiteSpace: 'nowrap',
      }}
    >
      {type === 'status' && (
        <span style={{
          width: 6, height: 6,
          borderRadius: '50%',
          background: colors.color,
          display: 'inline-block',
        }} />
      )}
      {label}
    </span>
  )
}
