import { motion } from 'framer-motion'
import { Mail, ExternalLink } from 'lucide-react'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import styles from './EmployeeCard.module.css'

export default function EmployeeCard({ employee, index = 0 }) {
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.3)' }}
    >
      <div className={styles.header}>
        <Avatar name={employee.name} color={employee.avatarColor} size={48} fontSize={16} />
        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{employee.name}</h3>
          <p className={styles.position}>{employee.position}</p>
        </div>
        <div className={styles.status}>
          <Badge label={employee.isActive ? 'active' : 'inactive'} type="status" />
        </div>
      </div>

      <div className={styles.badges}>
        <Badge label={employee.department} type="dept" />
      </div>

      <div className={styles.contact}>
        <a href={`mailto:${employee.email}`} className={styles.email}>
          <Mail size={13} />
          {employee.email}
        </a>
      </div>

      <div className={styles.footer}>
        <span className={styles.tenure}>🗓 {employee.tenure}yr tenure</span>
        <span className={styles.joinDate}>Joined {employee.joinDate}</span>
      </div>
    </motion.div>
  )
}
