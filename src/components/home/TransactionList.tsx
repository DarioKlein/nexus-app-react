import { ChevronRight } from 'lucide-react'
import { ASSET_SYMBOLS } from './constants'
import type { Transaction } from '../../types/data-types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function TransactionList({ transactions }: { transactions: Transaction[] }) {
  return (
    <div className="xl:col-span-2 bg-[#161616] border border-white/5 rounded-xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
        <div>
          <h2 className="text-white text-sm font-semibold">Últimas Movimentações</h2>
          <p className="text-gray-500 text-xs mt-0.5">8 transações recentes</p>
        </div>
        <button className="flex items-center gap-1 text-brand-red text-xs font-medium hover:text-red-400 transition-colors cursor-pointer">
          Ver todas <ChevronRight size={13} />
        </button>
      </div>

      <div className="divide-y divide-white/5">
        {transactions.map(tx => {
          const isDeposit = tx.type === 'DEPOSIT'
          const symbol = ASSET_SYMBOLS[tx.asset]
          const initials = tx.userName
            .split(' ')
            .slice(0, 2)
            .map(n => n[0])
            .join('')

          return (
            <div key={tx.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white/2 transition-colors">
              <div
                className={`w-8 h-8 rounded-full ${isDeposit ? 'bg-emerald-500/15' : 'bg-red-500/15'} flex items-center justify-center shrink-0`}
              >
                <span className={`text-xs font-bold ${isDeposit ? 'text-emerald-400' : 'text-red-400'}`}>
                  {initials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{tx.userName}</p>
                <p className="text-gray-500 text-xs">
                  {isDeposit ? 'Depósito' : 'Saque'} · {formatDate(tx.createdAt)}
                </p>
              </div>
              <div className="text-right shrink-0 flex flex-col items-end">
                <p
                  className={`text-sm font-semibold flex gap-2 items-center ${isDeposit ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {isDeposit ? '+' : '-'} {symbol} {tx.amount.toLocaleString('pt-BR')}
                </p>
                <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-medium">
                  {tx.observation ? tx.observation : "Concluído"}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
