import type { LucideProps } from 'lucide-react'

export type Kpi = {
  label: string
  value: string
  change: string
  positive: boolean
  icon: React.ComponentType<LucideProps>
  iconColor: string
  iconBg: string
  border: string
}
