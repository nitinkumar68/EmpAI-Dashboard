import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import Avatar from '../ui/Avatar'
import useAppStore from '../../store/useAppStore'
import styles from './MessageBubble.module.css'

function TypingIndicator() {
  return (
    <div className={styles.typingDots}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className={styles.dot}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

export function TypingBubble({ text }) {
  return (
    <motion.div
      className={`${styles.row} ${styles.ai}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.aiAvatar}>
        <Sparkles size={14} color="white" />
      </div>
      <div className={`${styles.bubble} ${styles.aiBubble}`}>
        {text ? (
          <p className={styles.text}>{text}</p>
        ) : (
          <TypingIndicator />
        )}
      </div>
    </motion.div>
  )
}

export default function MessageBubble({ message }) {
  const { profile } = useAppStore()
  const isUser = message.role === 'user'

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })

  // Simple markdown-like rendering
  const renderContent = (text) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <strong key={i}>{line.slice(2, -2)}</strong>
      }
      if (line.startsWith('• ') || line.startsWith('- ')) {
        return <li key={i} style={{ marginLeft: 16 }}>{line.slice(2)}</li>
      }
      if (line === '') return <br key={i} />
      // Bold text inline
      const parts = line.split(/(\*\*[^*]+\*\*)/g)
      return (
        <span key={i} style={{ display: 'block' }}>
          {parts.map((part, j) =>
            part.startsWith('**') && part.endsWith('**')
              ? <strong key={j}>{part.slice(2, -2)}</strong>
              : part
          )}
        </span>
      )
    })
  }

  return (
    <motion.div
      className={`${styles.row} ${isUser ? styles.user : styles.ai}`}
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {!isUser && (
        <div className={styles.aiAvatar}>
          <Sparkles size={14} color="white" />
        </div>
      )}

      <div className={`${styles.bubble} ${isUser ? styles.userBubble : styles.aiBubble}`}>
        <div className={styles.text}>
          {renderContent(message.content)}
        </div>
        <span className={styles.time}>{time}</span>
      </div>

      {isUser && (
        <Avatar name={profile.name} color="#6366F1" size={32} fontSize={12} />
      )}
    </motion.div>
  )
}
