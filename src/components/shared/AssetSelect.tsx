import { ASSET_ICONS } from '../home/constants'
import type { AssetType } from '../../types/data-types'

const ASSETS: AssetType[] = ['BTC', 'ETH', 'USDT', 'BRL']

const ASSET_COLORS: Record<AssetType, string> = {
  BTC: 'border-amber-500/40 bg-amber-500/10 text-amber-400',
  ETH: 'border-blue-500/40 bg-blue-500/10 text-blue-400',
  USDT: 'border-teal-500/40 bg-teal-500/10 text-teal-400',
  BRL: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
}

type Props = {
  selectedAsset: AssetType
  onChange: (asset: AssetType) => void
}

export function AssetSelect({ selectedAsset, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Ativo de Depósito</label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ASSETS.map(asset => (
          <button
            key={asset}
            onClick={() => onChange(asset)}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
              selectedAsset === asset
                ? ASSET_COLORS[asset]
                : 'border-white/10 bg-transparent text-gray-400 hover:border-white/20 hover:text-white'
            }`}
          >
            <div className="w-7 h-7 rounded-lg -mt-1 flex items-center justify-center text-white">
              {ASSET_ICONS[asset]}
            </div>
            {asset}
          </button>
        ))}
      </div>
    </div>
  )
}
