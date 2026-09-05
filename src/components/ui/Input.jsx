import { forwardRef } from 'react'

const Input = forwardRef(function Input(
  { label, icon, error, type = 'text', className = '', style = {}, ...props },
  ref
) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-muted)', letterSpacing: '0.02em' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--fg-subtle)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}>
            {icon}
          </span>
        )}
        <input
          ref={ref}
          type={type}
          className={className}
          style={{
            width: '100%',
            padding: icon ? '10px 14px 10px 40px' : '10px 14px',
            background: 'var(--bg-elevated)',
            border: `1px solid ${error ? 'var(--destructive)' : 'var(--border)'}`,
            borderRadius: 'var(--radius)',
            color: 'var(--fg)',
            fontSize: 14,
            fontFamily: 'var(--font-body)',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            ...style,
          }}
          onFocus={e => {
            e.target.style.borderColor = error ? 'var(--destructive)' : 'var(--accent)'
            e.target.style.boxShadow = error
              ? '0 0 0 3px rgba(239,68,68,0.15)'
              : '0 0 0 3px var(--accent-glow)'
          }}
          onBlur={e => {
            e.target.style.borderColor = error ? 'var(--destructive)' : 'var(--border)'
            e.target.style.boxShadow = 'none'
          }}
          {...props}
        />
      </div>
      {error && (
        <span style={{ fontSize: 12, color: 'var(--destructive)' }}>{error}</span>
      )}
    </div>
  )
})

export default Input
