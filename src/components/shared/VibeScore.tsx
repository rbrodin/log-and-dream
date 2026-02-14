import { getVibeColor } from '../../lib/utils'

interface VibeScoreProps {
  score: number | null
  size?: 'sm' | 'md' | 'lg'
}

export default function VibeScore({ score, size = 'md' }: VibeScoreProps) {
  const color = getVibeColor(score)
  const fontSize = size === 'sm' ? '12px' : size === 'lg' ? '18px' : '14px'
  const dotSize = size === 'sm' ? '6px' : '8px'

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize, fontWeight: 600, color: '#f5f5f5' }}>
      <span style={{ width: dotSize, height: dotSize, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
      {score !== null ? score.toFixed(1) : '—'}
    </span>
  )
}
