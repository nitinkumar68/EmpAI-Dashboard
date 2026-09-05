import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid
} from 'recharts'
import { Users, UserCheck, Building2, TrendingUp } from 'lucide-react'
import AppLayout from '../components/layout/AppLayout'
import StatCard from '../components/analytics/StatCard'
import { StatCardSkeleton } from '../components/ui/SkeletonLoader'
import { employees, departmentStats, monthlyHiring } from '../data/employees'
import styles from './Analytics.module.css'

const PIE_COLORS = ['#6366F1', '#22C55E', '#F59E0B', '#EC4899', '#14B8A6', '#F97316']

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: 8,
        padding: '10px 14px',
        fontSize: 13,
      }}>
        <p style={{ color: 'var(--fg-muted)', marginBottom: 4 }}>{label}</p>
        {payload.map((p, i) => (
          <p key={i} style={{ color: p.color, fontWeight: 600 }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(t)
  }, [])

  const totalEmployees = employees.length
  const activeEmployees = employees.filter(e => e.isActive).length
  const totalDepts = departmentStats.length
  const avgTenure = Math.round(employees.reduce((s, e) => s + e.tenure, 0) / employees.length)

  const stats = [
    { label: 'Total Employees', value: totalEmployees, icon: Users, color: '#6366F1', trend: 12, trendLabel: 'vs last quarter' },
    { label: 'Active Employees', value: activeEmployees, icon: UserCheck, color: '#22C55E', trend: 5, trendLabel: 'vs last month' },
    { label: 'Departments', value: totalDepts, icon: Building2, color: '#F59E0B', trend: 0, trendLabel: 'no change' },
    { label: 'Avg Tenure (yrs)', value: avgTenure, icon: TrendingUp, color: '#EC4899', trend: 8, trendLabel: 'vs last year' },
  ]

  return (
    <AppLayout>
      <div className={styles.page}>
        {/* Stat cards */}
        <div className={styles.statsGrid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
            : stats.map((s, i) => <StatCard key={s.label} {...s} index={i} />)
          }
        </div>

        {/* Charts row */}
        <div className={styles.chartsRow}>
          {/* Bar chart */}
          <motion.div
            className={styles.chartCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Headcount by Department</h3>
              <p className={styles.chartSubtitle}>Total employees per department</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={departmentStats} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="count" name="Total" fill="#6366F1" radius={[6, 6, 0, 0]} />
                <Bar dataKey="active" name="Active" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pie chart */}
          <motion.div
            className={styles.chartCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Department Distribution</h3>
              <p className={styles.chartSubtitle}>% of total workforce</p>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={departmentStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="count"
                  nameKey="name"
                  paddingAngle={3}
                  animationBegin={0}
                  animationDuration={800}
                >
                  {departmentStats.map((_, index) => (
                    <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ fontSize: 12, color: 'var(--fg-muted)' }}
                  iconType="circle"
                  iconSize={8}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Line chart */}
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Monthly Hiring Trend</h3>
            <p className={styles.chartSubtitle}>New hires per month over the last 12 months</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyHiring}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="month"
                tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'var(--fg-muted)', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="hired"
                name="Hired"
                stroke="#6366F1"
                strokeWidth={2.5}
                dot={{ fill: '#6366F1', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#818CF8' }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department table */}
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className={styles.chartHeader}>
            <h3 className={styles.chartTitle}>Department Summary</h3>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Total</th>
                  <th>Active</th>
                  <th>Active Rate</th>
                  <th>Headcount Bar</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept, i) => {
                  const rate = Math.round((dept.active / dept.count) * 100)
                  return (
                    <motion.tr
                      key={dept.name}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.06 }}
                    >
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{
                            width: 10, height: 10, borderRadius: '50%',
                            background: PIE_COLORS[i % PIE_COLORS.length],
                            display: 'inline-block',
                          }} />
                          {dept.name}
                        </span>
                      </td>
                      <td className={styles.tdNum}>{dept.count}</td>
                      <td className={styles.tdNum}>{dept.active}</td>
                      <td>
                        <span style={{ color: rate >= 80 ? '#22C55E' : '#F59E0B', fontWeight: 600 }}>
                          {rate}%
                        </span>
                      </td>
                      <td>
                        <div className={styles.miniBar}>
                          <motion.div
                            className={styles.miniBarFill}
                            style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(dept.count / 10) * 100}%` }}
                            transition={{ delay: 0.8 + i * 0.06, duration: 0.5 }}
                          />
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  )
}
