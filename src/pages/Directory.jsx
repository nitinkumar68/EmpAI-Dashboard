import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Users, X } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import EmployeeCard from '../components/directory/EmployeeCard'
import { EmployeeCardSkeleton } from '../components/ui/SkeletonLoader'
import { employees } from '../data/employees'
import styles from './Directory.module.css'

const departments = ['All', 'Engineering', 'Marketing', 'HR', 'Finance', 'Design', 'Operations']

function EmptyState({ query }) {
  return (
    <motion.div
      className={styles.emptyState}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className={styles.emptyIcon}>
        <Users size={32} color="var(--fg-subtle)" />
      </div>
      <h3 className={styles.emptyTitle}>No employees found</h3>
      <p className={styles.emptySubtitle}>
        {query
          ? `No results for "${query}". Try a different search.`
          : 'No employees in this department yet.'}
      </p>
    </motion.div>
  )
}

export default function Directory() {
  const [search, setSearch] = useState('')
  const [activeDept, setActiveDept] = useState('All')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const filtered = useMemo(() => {
    return employees.filter((emp) => {
      const matchesDept = activeDept === 'All' || emp.department === activeDept
      const q = search.toLowerCase()
      const matchesSearch = !q || emp.name.toLowerCase().includes(q) ||
        emp.department.toLowerCase().includes(q) ||
        emp.position.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q)
      return matchesDept && matchesSearch
    })
  }, [search, activeDept])

  return (
    <AppLayout>
      <div className={styles.page}>
        {/* Search + Filters */}
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input
              className={styles.searchInput}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, role, or department..."
              id="employee-search"
            />
            {search && (
              <button className={styles.clearSearch} onClick={() => setSearch('')} id="clear-search-btn">
                <X size={14} />
              </button>
            )}
          </div>
          <span className={styles.resultCount}>
            {filtered.length} employee{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Department tabs */}
        <div className={styles.tabs}>
          {departments.map((dept) => (
            <motion.button
              key={dept}
              className={`${styles.tab} ${activeDept === dept ? styles.tabActive : ''}`}
              onClick={() => setActiveDept(dept)}
              whileTap={{ scale: 0.96 }}
              id={`dept-tab-${dept.toLowerCase()}`}
            >
              {dept}
              <span className={styles.tabCount}>
                {dept === 'All' ? employees.length : employees.filter(e => e.department === dept).length}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className={styles.grid}>
            {Array.from({ length: 9 }).map((_, i) => (
              <EmployeeCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState query={search} />
        ) : (
          <div className={styles.grid}>
            <AnimatePresence mode="popLayout">
              {filtered.map((emp, i) => (
                <EmployeeCard key={emp.id} employee={emp} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </AppLayout>
  )
}
