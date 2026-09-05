import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, MessageSquare, Users, BarChart3, Settings,
  Sparkles, ChevronLeft, ChevronRight, LogOut,
} from 'lucide-react'
import useAppStore from '../../store/useAppStore'
import Avatar from '../ui/Avatar'
import styles from './Sidebar.module.css'
import { useState } from 'react'

const navItems = [
  { path: '/',          label: 'Home',       icon: LayoutDashboard },
  { path: '/chat',      label: 'AI Chat',    icon: MessageSquare },
  { path: '/directory', label: 'Directory',  icon: Users },
  { path: '/analytics', label: 'Analytics',  icon: BarChart3 },
  { path: '/profile',   label: 'Settings',   icon: Settings },
]

export default function Sidebar() {
  const { profile } = useAppStore()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      className={styles.sidebar}
      animate={{ width: collapsed ? 68 : 240 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Sparkles size={18} color="white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              className={styles.logoText}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              EmpAI
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(path)

          return (
            <NavLink
              key={path}
              to={path}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              title={collapsed ? label : undefined}
            >
              {isActive && (
                <motion.div
                  className={styles.activeBg}
                  layoutId="nav-active"
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
              <Icon size={18} className={styles.navIcon} />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className={styles.bottom}>
        <div className={styles.userInfo}>
          <Avatar name={profile.name} color="#6366F1" size={32} fontSize={12} />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className={styles.userMeta}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.userName}>{profile.name}</span>
                <span className={styles.userTitle}>{profile.title}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </motion.aside>
  )
}
