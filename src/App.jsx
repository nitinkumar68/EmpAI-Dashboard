import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import Landing from './pages/Landing'
import Chat from './pages/Chat'
import Directory from './pages/Directory'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import useAppStore from './store/useAppStore'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

const pageTransition = {
  duration: 0.25,
  ease: [0.16, 1, 0.3, 1],
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        style={{ minHeight: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const { initTheme } = useAppStore()

  useEffect(() => {
    initTheme()
  }, [initTheme])

  return (
    <>
      <AnimatedRoutes />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0E1223',
            color: '#F8FAFC',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            fontSize: '14px',
            fontFamily: 'DM Sans, sans-serif',
          },
          success: {
            iconTheme: { primary: '#22C55E', secondary: '#F8FAFC' },
          },
          error: {
            iconTheme: { primary: '#EF4444', secondary: '#F8FAFC' },
          },
        }}
      />
    </>
  )
}
