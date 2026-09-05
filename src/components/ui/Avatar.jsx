export default function Avatar({ name, color, size = 40, fontSize = 14 }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: color || 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 700,
        color: 'white',
        fontFamily: 'var(--font-heading)',
        flexShrink: 0,
        letterSpacing: '0.05em',
        boxShadow: `0 0 12px ${color || 'var(--accent)'}44`,
        border: '2px solid rgba(255,255,255,0.1)',
      }}
    >
      {initials}
    </div>
  )
}
