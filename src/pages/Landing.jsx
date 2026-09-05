import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Sparkles, MessageSquare, Users, BarChart3, Shield,
  ArrowRight, Zap, Brain, Globe, Star, ChevronDown
} from 'lucide-react'
import Button from '../components/ui/Button'
import styles from './Landing.module.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Brain, title: 'AI-Powered Insights', desc: 'Get intelligent answers about HR policies, benefits, and team management in seconds.', color: '#6366F1' },
  { icon: Users, title: 'Smart Directory', desc: 'Find teammates instantly with smart search and department filtering across your organization.', color: '#22C55E' },
  { icon: BarChart3, title: 'Live Analytics', desc: 'Visualize headcount, hiring trends, and department distributions with beautiful charts.', color: '#F59E0B' },
  { icon: Shield, title: 'Privacy First', desc: 'Your API keys stay local. No data is sent to our servers — complete privacy guaranteed.', color: '#EC4899' },
  { icon: Zap, title: 'Lightning Fast', desc: 'Instant responses powered by Gemini 2.0 Flash — the fastest AI model available.', color: '#14B8A6' },
  { icon: Globe, title: 'Voice Support', desc: 'Talk to your AI assistant using voice input powered by the Web Speech API.', color: '#8B5CF6' },
]

const stats = [
  { label: 'Employees Managed', value: '50+', suffix: '' },
  { label: 'AI Responses/Day', value: '1K', suffix: '+' },
  { label: 'Departments', value: '6', suffix: '' },
  { label: 'Uptime', value: '99.9', suffix: '%' },
]

export default function Landing() {
  const navigate = useNavigate()
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', { opacity: 0, y: -16, duration: 0.6, ease: 'power2.out' })
      gsap.from('.hero-title', { opacity: 0, y: 32, duration: 0.8, delay: 0.15, ease: 'power3.out' })
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power2.out' })
      gsap.from('.hero-cta', { opacity: 0, y: 20, duration: 0.6, delay: 0.45, ease: 'power2.out' })
      gsap.from('.hero-cards', { opacity: 0, y: 40, duration: 0.9, delay: 0.6, ease: 'power3.out' })

      // Scroll reveals
      gsap.utils.toArray('.reveal-card').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.5,
          delay: i * 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        })
      })

      gsap.utils.toArray('.stat-num').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className={styles.page}>
      {/* Ambient blobs */}
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><Sparkles size={16} color="white" /></div>
            <span className={styles.logoText}>EmpAI</span>
          </div>
          <div className={styles.headerActions}>
            <Button variant="ghost" onClick={() => navigate('/directory')}>Directory</Button>
            <Button variant="ghost" onClick={() => navigate('/analytics')}>Analytics</Button>
            <Button variant="primary" size="sm" onClick={() => navigate('/chat')} id="launch-app-btn">
              Launch App
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <motion.div
            className={`${styles.heroBadge} hero-badge`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Sparkles size={12} color="#818CF8" />
            <span>Powered by Gemini 2.0 Flash</span>
          </motion.div>

          <h1 className={`${styles.heroTitle} hero-title`}>
            Your AI-Powered<br />
            <span className={styles.gradientText}>Employee Assistant</span>
          </h1>

          <p className={`${styles.heroSubtitle} hero-subtitle`}>
            Transform how you manage your team with intelligent AI assistance,
            beautiful analytics, and instant employee insights — all in one place.
          </p>

          <div className={`${styles.heroCta} hero-cta`}>
            <Button
              variant="primary"
              size="xl"
              icon={<MessageSquare size={18} />}
              onClick={() => navigate('/chat')}
              id="hero-cta-btn"
            >
              Start AI Chat
            </Button>
            <Button
              variant="outline"
              size="xl"
              icon={<Users size={18} />}
              onClick={() => navigate('/directory')}
              id="hero-dir-btn"
            >
              View Directory
            </Button>
          </div>

          {/* Mini preview cards */}
          <div className={`${styles.heroCards} hero-cards`}>
            {[
              { icon: '🤖', text: 'AI answers HR queries instantly' },
              { icon: '📊', text: 'Real-time analytics dashboard' },
              { icon: '🔍', text: 'Smart employee search & filter' },
            ].map((item, i) => (
              <div key={i} className={styles.previewCard}>
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrollHint}>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} color="var(--fg-muted)" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className={styles.statsSection} ref={statsRef}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <div key={i} className={styles.statItem}>
              <div className={`${styles.statNum} stat-num`}>{s.value}{s.suffix}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.features} ref={featuresRef}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionBadge}>Features</span>
          <h2 className={styles.sectionTitle}>Everything your team needs</h2>
          <p className={styles.sectionSubtitle}>
            A complete platform for modern HR and employee management, powered by cutting-edge AI.
          </p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              className={`${styles.featureCard} reveal-card`}
              whileHover={{ y: -6, borderColor: `${feature.color}44` }}
              transition={{ duration: 0.25 }}
            >
              <div
                className={styles.featureIcon}
                style={{ background: `${feature.color}18`, border: `1px solid ${feature.color}33` }}
              >
                <feature.icon size={22} color={feature.color} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDesc}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={`${styles.ctaCard} reveal-card`}>
          <div className={styles.ctaGlow} />
          <Star size={32} color="#818CF8" style={{ marginBottom: 16 }} />
          <h2 className={styles.ctaTitle}>Ready to transform your HR experience?</h2>
          <p className={styles.ctaSubtitle}>
            Get started with EmpAI today. No signup required — just add your Gemini API key.
          </p>
          <Button
            variant="primary"
            size="xl"
            icon={<ArrowRight size={18} />}
            onClick={() => navigate('/chat')}
            id="cta-bottom-btn"
          >
            Get Started Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><Sparkles size={14} color="white" /></div>
            <span className={styles.logoText}>EmpAI</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--fg-subtle)' }}>
            Built with ❤️ using React + Gemini AI
          </p>
        </div>
      </footer>
    </div>
  )
}
