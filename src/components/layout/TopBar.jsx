import { Bell, Sun, Moon, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import useAppStore from '../../store/useAppStore'
import styles from './TopBar.module.css'

const pageTitles = {
  '/':          { title: 'Dashboard', subtitle: 'Welcome back 👋' },
  '/chat':      { title: 'AI Assistant', subtitle: 'Powered by Gemini AI' },
  '/directory': { title: 'Employee Directory', subtitle: 'Find and connect with your team' },
  '/analytics': { title: 'Analytics', subtitle: 'Team insights at a glance' },
  '/profile':   { title: 'Profile Settings', subtitle: 'Manage your account' },
}

export default function TopBar({ pathname }) {
  const { theme, toggleTheme } = useAppStore()
  const page = pageTitles[pathname] || pageTitles['/']

  return (
    <header className={styles.topbar}>
      <div className={styles.titleArea}>
        <motion.h1
          key={pathname}
          className={styles.pageTitle}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {page.title}
        </motion.h1>
        <motion.p
          key={pathname + '-sub'}
          className={styles.pageSubtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          {page.subtitle}
        </motion.p>
      </div>

      <div className={styles.actions}>
        <motion.button
          className={styles.iconBtn}
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
          id="theme-toggle-btn"
        >
          <motion.div
            key={theme}
            initial={{ rotate: -30, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.div>
        </motion.button>

        <motion.button
          className={styles.iconBtn}
          whileTap={{ scale: 0.9 }}
          aria-label="Notifications"
          id="notifications-btn"
          style={{ position: 'relative' }}
        >
          <Bell size={18} />
          <span className={styles.notifBadge}>3</span>
        </motion.button>
      </div>
    </header>
  )
}
