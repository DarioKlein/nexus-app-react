import type { Balance } from '../../types/data-types'
import { ASSET_ICONS } from './constants'

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const RATES: Record<string, number> = { BRL: 1, BTC: 350000, ETH: 18000, USDT: 5.7 }
const CHANGES: Record<string, string> = { BRL: '+2,1%', BTC: '+4,8%', ETH: '-1,2%', USDT: '+0,01%' }
const CHANGE_POSITIVE: Record<string, boolean> = { BRL: true, BTC: true, ETH: false, USDT: true }

type Props = {
  consolidated: Balance
  maxBalance: number
  totalConsolidatedBRL: number
}

export function AssetBalances({ consolidated, maxBalance, totalConsolidatedBRL }: Props) {
  return (
    <div className="bg-[#161616] border border-white/5 rounded-xl">
      <div className="px-5 py-4 border-b border-white/5">
        <h2 className="text-white text-sm font-semibold">Saldos por Ativo</h2>
        <p className="text-gray-500 text-xs mt-0.5">Posição atual da plataforma</p>
      </div>

      <div className="px-5 py-4 space-y-4">
        {(Object.entries(consolidated) as [string, number][]).map(([asset, amount]) => {
          const valueInBRL = amount * RATES[asset]
          const barWidth = maxBalance > 0 ? (valueInBRL / maxBalance) * 100 : 0

          return (
            <div key={asset} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white">
                    {ASSET_ICONS[asset]}
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">{asset}</p>
                    <p className="text-gray-500 text-xs">
                      {amount.toLocaleString('pt-BR', { maximumFractionDigits: 4 })} {asset}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold ${CHANGE_POSITIVE[asset] ? 'text-emerald-400' : 'text-red-400'}`}
                >
                  {CHANGES[asset]}
                </span>
              </div>
              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all" style={{ width: `${barWidth}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mx-5 mb-5 p-3 rounded-lg bg-brand-red/10 border border-brand-red/20">
        <p className="text-gray-400 text-xs mb-1">Total consolidado em BRL</p>
        <p className="text-white text-lg font-bold">{formatBRL(totalConsolidatedBRL)}</p>
      </div>
    </div>
  )
}
