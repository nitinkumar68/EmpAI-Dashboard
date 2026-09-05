export default function SkeletonLoader({ width = '100%', height = 20, borderRadius = 8, className = '' }) {
  return (
    <div
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius,
        background: 'var(--bg-elevated)',
        animation: 'skeleton-pulse 1.5s ease-in-out infinite',
      }}
    />
  )
}

export function EmployeeCardSkeleton() {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <SkeletonLoader width={48} height={48} borderRadius={24} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SkeletonLoader width="70%" height={16} />
          <SkeletonLoader width="50%" height={12} />
        </div>
      </div>
      <SkeletonLoader width="40%" height={20} borderRadius={99} />
      <SkeletonLoader width="100%" height={14} />
    </div>
  )
}

export function StatCardSkeleton() {
  return (
    <div style={{
      background: 'var(--card)',
      border: '1px solid var(--card-border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonLoader width="60%" height={14} />
        <SkeletonLoader width={36} height={36} borderRadius={8} />
      </div>
      <SkeletonLoader width="40%" height={36} />
      <SkeletonLoader width="50%" height={12} />
    </div>
  )
}
