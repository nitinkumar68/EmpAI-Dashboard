import { motion } from 'framer-motion'
import { suggestedPrompts } from '../../services/geminiService'

export default function SuggestedPrompts({ onSelect }) {
  return (
    <div style={{ padding: '8px 0 0', overflowX: 'auto' }}>
      <div
        style={{
          display: 'flex',
          gap: 8,
          padding: '0 4px 4px',
          width: 'max-content',
        }}
      >
        {suggestedPrompts.map((prompt, i) => (
          <motion.button
            key={i}
            onClick={() => onSelect(prompt)}
            style={{
              padding: '7px 14px',
              borderRadius: 9999,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              color: 'var(--fg-muted)',
              fontSize: 12,
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            whileHover={{
              background: 'rgba(99,102,241,0.15)',
              borderColor: 'rgba(99,102,241,0.4)',
              color: 'var(--fg)',
              scale: 1.02,
            }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
          >
            {prompt}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
