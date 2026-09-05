import { motion } from 'framer-motion'

export default function Card({ children, className = '', hover = true, glow = false, style = {}, onClick }) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-lg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        cursor: onClick ? 'pointer' : 'default',
        ...(glow && { boxShadow: 'var(--shadow-glow)' }),
        ...style,
      }}
      whileHover={hover ? {
        borderColor: 'rgba(99, 102, 241, 0.25)',
        boxShadow: glow ? '0 0 32px rgba(99, 102, 241, 0.4)' : '0 8px 32px rgba(0,0,0,0.4)',
        y: -2,
      } : {}}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
