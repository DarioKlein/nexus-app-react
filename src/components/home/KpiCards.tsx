import { TrendingUp, TrendingDown, ArrowDownCircle, ArrowUpCircle, Users } from 'lucide-react'
import { useHomeStats } from '../../hooks/useHomeStats'
import { FaBrazilianRealSign } from 'react-icons/fa6'
import type { Kpi } from '../../types/home-types'

export function KpiCards() {
  const stats = useHomeStats()
  function formatBRL(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const kpis: Kpi[] = [
    {
      label: 'Total Depositado',
      value: formatBRL(stats.totalDeposited),
      change: '+12,4% vs. mês anterior',
      positive: true,
      icon: ArrowDownCircle,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20'
    },
    {
      label: 'Total Sacado',
      value: formatBRL(stats.totalWithdrawn),
      change: '-3,1% vs. mês anterior',
      positive: false,
      icon: ArrowUpCircle,
      iconColor: 'text-red-400',
      iconBg: 'bg-red-500/10',
      border: 'border-red-500/20'
    },
    {
      label: 'Usuários Ativos',
      value: stats.activeUsers.toLocaleString('pt-BR'),
      change: '+5,7% vs. mês anterior',
      positive: true,
      icon: Users,
      iconColor: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      border: 'border-blue-500/20'
    },
    {
      label: 'Volume Total em BRL',
      value: formatBRL(stats.totalVolumeBRL),
      change: '+28,3% vs. mês anterior',
      positive: true,
      icon: FaBrazilianRealSign,
      iconColor: 'text-white',
      iconBg: 'bg-white/10',
      border: 'border-white/10'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {kpis.map(kpi => (
        <div key={kpi.label} className={`bg-[#161616] border ${kpi.border} rounded-xl p-4 space-y-3`}>
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium">{kpi.label}</span>
            <div className={`${kpi.iconBg} p-1.5 rounded-lg`}>
              <kpi.icon size={14} className={kpi.iconColor} />
            </div>
          </div>
          <p className="text-white text-xl font-bold tracking-tight">{kpi.value}</p>
          <div className="flex items-center gap-1">
            {kpi.positive ? (
              <TrendingUp size={12} className="text-emerald-400" />
            ) : (
              <TrendingDown size={12} className="text-red-400" />
            )}
            <span className={`text-xs font-medium ${kpi.positive ? 'text-emerald-400' : 'text-red-400'}`}>
              {kpi.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
