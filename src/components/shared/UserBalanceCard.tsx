import { Wallet } from 'lucide-react'
import { ASSET_ICONS } from '../home/constants'
import type { AssetType, User } from '../../types/data-types'

const ASSETS: AssetType[] = ['BTC', 'ETH', 'USDT', 'BRL']

const ASSET_RATES: Record<AssetType, number> = {
  BRL: 1,
  BTC: 350000,
  ETH: 18000,
  USDT: 5.7
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 60) return `Há ${minutes} minutos`
  if (hours < 24) return `Há ${hours} horas`
  return `Há ${days} dias`
}

type Props = {
  user: User
  selectedAsset: AssetType
}

export function UserBalanceCard({ user, selectedAsset }: Props) {
  return (
    <div className="w-full xl:w-72 bg-[#161616] border border-white/5 rounded-xl p-5 space-y-4 h-fit">
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Saldo Atual</span>
        <Wallet size={14} className="text-gray-600" />
      </div>

      <div>
        <p className="text-gray-400 text-sm">{user.name}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-white text-3xl font-bold">
            {user.balances[selectedAsset].toLocaleString('pt-BR', { maximumFractionDigits: 6 })}
          </span>
          <span className="text-brand-red font-semibold text-sm">{selectedAsset}</span>
        </div>
        <p className="text-gray-500 text-xs mt-0.5">
          ≈ {formatBRL(user.balances[selectedAsset] * ASSET_RATES[selectedAsset])}
        </p>
      </div>

      <div className="space-y-2 pt-2 border-t border-white/5">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Última Atividade</span>
          <span className="text-white text-xs font-medium">{timeAgo(user.lastActivity)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">Status da Conta</span>
          <span className="text-emerald-400 text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
            Verificada
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-2 border-t border-white/5">
        <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Todos os Saldos</span>
        {ASSETS.map(asset => (
          <div key={asset} className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white">{ASSET_ICONS[asset]}</div>
              <span className="text-xs">{asset}</span>
            </div>
            <span className="text-white text-xs font-medium">
              {user.balances[asset].toLocaleString('pt-BR', { maximumFractionDigits: 6 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
