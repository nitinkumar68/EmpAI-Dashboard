import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ label, value, icon: Icon, color = 'var(--accent)', trend, trendLabel, index = 0 }) {
  const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus
  const trendColor = trend > 0 ? '#22C55E' : trend < 0 ? '#EF4444' : 'var(--fg-muted)'

  return (
    <motion.div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3, borderColor: `${color}44` }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: -20,
        right: -20,
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: color,
        opacity: 0.06,
        filter: 'blur(20px)',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ fontSize: 13, color: 'var(--fg-muted)', fontWeight: 500 }}>{label}</span>
        {Icon && (
          <div style={{
            width: 38,
            height: 38,
            borderRadius: 'var(--radius)',
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${color}33`,
          }}>
            <Icon size={18} color={color} />
          </div>
        )}
      </div>

      <motion.div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: 'var(--fg)',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.04em',
          lineHeight: 1,
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.08 + 0.1, duration: 0.4 }}
      >
        {value}
      </motion.div>

      {trendLabel && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TrendIcon size={14} color={trendColor} />
          <span style={{ fontSize: 12, color: trendColor, fontWeight: 500 }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          <span style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>{trendLabel}</span>
        </div>
      )}
    </motion.div>
  )
}
