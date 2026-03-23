import { ASSET_ICONS, ASSET_SYMBOLS } from '../home/constants'
import type { AssetType, User } from '../../types/data-types'

const ASSET_RATES: Record<AssetType, number> = {
  BRL: 1,
  BTC: 350000,
  ETH: 18000,
  USDT: 5.7
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

type Props = {
  user: User | null
  selectedAsset: AssetType
  amount: number
}

export function WithdrawSummary({ user, selectedAsset, amount }: Props) {
  const approxBRL = amount * ASSET_RATES[selectedAsset]

  return (
    <div className="bg-[#161616] border border-white/5 rounded-xl p-4 space-y-3">
      <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Resumo da Operação</span>

      <div className="space-y-2 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Usuário</span>
          <span className="text-white text-xs font-medium truncate max-w-40">{user?.name ?? '—'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Ativo</span>
          <div className="flex items-center gap-1.5 text-white text-xs font-medium">
            {ASSET_ICONS[selectedAsset]}
            {selectedAsset}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Valor</span>
          <span className="text-white text-xs font-medium">
            {amount > 0
              ? `${ASSET_SYMBOLS[selectedAsset]} ${amount.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}`
              : '—'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Taxa</span>
          <span className="text-emerald-400 text-xs font-medium">0,00%</span>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-white text-xs font-semibold">Total a Debitar</span>
          <div className="text-right">
            <p className="text-brand-red text-sm font-bold">
              {amount > 0
                ? `${ASSET_SYMBOLS[selectedAsset]} ${amount.toLocaleString('pt-BR', { maximumFractionDigits: 6 })}`
                : '—'}
            </p>
            {amount > 0 && <p className="text-gray-500 text-xs">≈ {formatBRL(approxBRL)}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
