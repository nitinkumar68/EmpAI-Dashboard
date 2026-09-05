import { motion } from 'framer-motion'
import styles from './Button.module.css'

const variants = {
  primary: styles.primary,
  ghost: styles.ghost,
  outline: styles.outline,
  danger: styles.danger,
  secondary: styles.secondary,
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  onClick,
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <motion.button
      type={type}
      className={`${styles.btn} ${variants[variant] || styles.primary} ${styles[size]} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ duration: 0.15 }}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} />
      ) : (
        <>
          {icon && <span className={styles.icon}>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  )
}
