import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Briefcase, Key, Bell, Shield, Save } from 'lucide-react'
import toast from 'react-hot-toast'
import AppLayout from '../components/layout/AppLayout'
import Avatar from '../components/ui/Avatar'
import Toggle from '../components/ui/Toggle'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import useAppStore from '../store/useAppStore'
import styles from './Profile.module.css'

function Section({ title, subtitle, children }) {
  return (
    <motion.div
      className={styles.section}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  )
}

export default function Profile() {
  const { profile, updateProfile, notifications, updateNotifications, theme, toggleTheme } = useAppStore()
  const [formData, setFormData] = useState({ ...profile })

  const handleSaveProfile = () => {
    updateProfile(formData)
    toast.success('Profile updated successfully!', {
      style: { background: 'var(--card)', color: 'var(--fg)', border: '1px solid var(--border)' },
    })
  }

  return (
    <AppLayout>
      <div className={styles.page}>
        <div className={styles.layout}>
          {/* Left column */}
          <div className={styles.leftCol}>
            {/* Profile Card */}
            <Section title="Profile" subtitle="Manage your personal information">
              <div className={styles.avatarSection}>
                <Avatar name={formData.name} color="#6366F1" size={80} fontSize={28} />
                <div>
                  <p className={styles.avatarName}>{formData.name}</p>
                  <p className={styles.avatarTitle}>{formData.title}</p>
                  <p className={styles.avatarDept}>{formData.department}</p>
                </div>
              </div>
              <div className={styles.formGrid}>
                <Input
                  label="Full Name"
                  icon={<User size={15} />}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  id="profile-name"
                />
                <Input
                  label="Email"
                  type="email"
                  icon={<Mail size={15} />}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  id="profile-email"
                />
                <Input
                  label="Job Title"
                  icon={<Briefcase size={15} />}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  id="profile-title"
                />
                <Input
                  label="Department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  id="profile-dept"
                />
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg-muted)', display: 'block', marginBottom: 6 }}>Bio</label>
                <textarea
                  className={styles.textarea}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  id="profile-bio"
                  placeholder="A short bio about yourself..."
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="primary"
                  icon={<Save size={15} />}
                  onClick={handleSaveProfile}
                  id="save-profile-btn"
                >
                  Save Profile
                </Button>
              </div>
            </Section>

            {/* Notifications */}
            <Section title="Notifications" subtitle="Control what alerts you receive">
              <div className={styles.notifList}>
                {[
                  { key: 'emailNotifs', label: 'Email Notifications', desc: 'Receive updates via email' },
                  { key: 'pushNotifs', label: 'Push Notifications', desc: 'Browser push alerts' },
                  { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary email every Monday' },
                  { key: 'chatSummary', label: 'Chat Summaries', desc: 'AI conversation summaries' },
                ].map(({ key, label, desc }) => (
                  <div key={key} className={styles.notifRow}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg)' }}>{label}</span>
                      <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{desc}</span>
                    </div>
                    <Toggle
                      checked={notifications[key]}
                      onChange={(val) => updateNotifications({ [key]: val })}
                      id={`notif-${key}`}
                    />
                  </div>
                ))}
              </div>
            </Section>
          </div>

          {/* Right column */}
          <div className={styles.rightCol}>
            {/* Appearance */}
            <Section title="Appearance" subtitle="Customize how EmpAI looks">
              <div className={styles.themeRow}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--fg)' }}>
                    {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>
                    {theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                  </span>
                </div>
                <Toggle
                  checked={theme === 'dark'}
                  onChange={toggleTheme}
                  id="theme-toggle"
                />
              </div>

              {/* Theme preview */}
              <div className={styles.themePreview}>
                <motion.div
                  className={`${styles.themeCard} ${theme === 'dark' ? styles.themeDark : styles.themeLight}`}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  <div className={styles.previewHeader} />
                  <div className={styles.previewContent}>
                    {[80, 60, 90].map((w, i) => (
                      <div key={i} className={styles.previewLine} style={{ width: `${w}%` }} />
                    ))}
                  </div>
                </motion.div>
              </div>
            </Section>

            {/* Security (visual only) */}
            <Section title="Security" subtitle="Account security settings">
              <div className={styles.securityList}>
                {[
                  { label: '2-Factor Authentication', status: 'Enabled', icon: Shield, color: '#22C55E' },
                  { label: 'Last Login', status: 'Just now', icon: User, color: '#6366F1' },
                  { label: 'Active Sessions', status: '1 device', icon: Key, color: '#F59E0B' },
                ].map(({ label, status, icon: Icon, color }) => (
                  <div key={label} className={styles.securityRow}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 'var(--radius-sm)',
                      background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${color}33`,
                    }}>
                      <Icon size={16} color={color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg)' }}>{label}</p>
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--fg-muted)', fontWeight: 500 }}>{status}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
