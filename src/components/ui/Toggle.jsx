import { motion } from 'framer-motion'

export default function Toggle({ checked, onChange, label, id }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        style={{ position: 'relative', display: 'inline-flex' }}
        onClick={() => onChange(!checked)}
      >
        <div
          style={{
            width: 44,
            height: 24,
            borderRadius: 99,
            background: checked ? 'var(--accent)' : 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            transition: 'background 0.25s ease',
            position: 'relative',
          }}
        >
          <motion.div
            layout
            style={{
              position: 'absolute',
              top: 3,
              left: checked ? 22 : 3,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'white',
              boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </div>
        <input id={id} type="checkbox" checked={checked} onChange={() => {}} style={{ display: 'none' }} />
      </div>
      {label && (
        <span style={{ fontSize: 14, color: 'var(--fg)', fontWeight: 500 }}>
          {label}
        </span>
      )}
    </label>
  )
}
