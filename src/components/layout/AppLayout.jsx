import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import styles from './AppLayout.module.css'

export default function AppLayout({ children }) {
  const location = useLocation()

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.content}>
        <TopBar pathname={location.pathname} />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  )
}
