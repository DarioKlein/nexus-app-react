import { ASSET_SYMBOLS } from '../home/constants'
import type { AssetType } from '../../types/data-types'

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
  selectedAsset: AssetType
  amount: string
  onChange: (value: string) => void
}

export function AmountInput({ selectedAsset, amount, onChange }: Props) {
  const amountNumber = parseFloat(amount.replace(',', '.')) || 0
  const approxBRL = amountNumber * ASSET_RATES[selectedAsset]

  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Valor do Depósito</label>
      <div className="bg-[#161616] sm:flex justify-between border border-white/10 rounded-xl px-4 py-3 hover:border-white/20 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm shrink-0">{ASSET_SYMBOLS[selectedAsset]}</span>
          <input
            type="number"
            min="0"
            step="any"
            placeholder="0.00000"
            value={amount}
            onChange={e => onChange(e.target.value)}
            className="flex-1 bg-transparent text-white text-xl font-bold outline-none placeholder-gray-600"
          />
        </div>
        {amountNumber > 0 && <p className="text-gray-500 text-xs mt-2 text-right">≈ {formatBRL(approxBRL)}</p>}
      </div>
    </div>
  )
}
