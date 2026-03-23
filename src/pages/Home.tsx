import { HomeIcon } from 'lucide-react'
import { KpiCards } from '../components/home/KpiCards'
import { TransactionList } from '../components/home/TransactionList'
import { AssetBalances } from '../components/home/AssetBalances'
import { useHomeStats } from '../hooks/useHomeStats'

export function Home() {
  const stats = useHomeStats()
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl font-bold flex items-center gap-3">
            <HomeIcon size={27} />
            Home
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Resumo da plataforma</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-gray-400 text-xs">Ao vivo</span>
        </div>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <TransactionList transactions={stats.recentTransactions} />
        <AssetBalances
          consolidated={stats.consolidated}
          maxBalance={stats.maxBalance}
          totalConsolidatedBRL={stats.totalConsolidatedBRL}
        />
      </div>
    </div>
  )
}
