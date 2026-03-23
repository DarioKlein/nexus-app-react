import { ArrowUpDown, RefreshCw, AlertCircle, Info } from 'lucide-react'
import { useConversion } from '../hooks/useConversion'
import { UserSelect } from '../components/shared/UserSelect'
import { UserBalanceCard } from '../components/shared/UserBalanceCard'
import { ASSET_ICONS, ASSET_SYMBOLS } from '../components/home/constants'
import type { AssetType } from '../types/data-types'

const ASSETS: AssetType[] = ['BTC', 'ETH', 'USDT', 'BRL']

const ASSET_NAMES: Record<AssetType, string> = {
  BTC: 'Bitcoin',
  ETH: 'Ethereum',
  USDT: 'Tether',
  BRL: 'Real Brasileiro'
}

const ASSET_RATES: Record<AssetType, number> = {
  BRL: 1,
  BTC: 350000,
  ETH: 18000,
  USDT: 5.7
}

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function Conversion() {
  const {
    activeUsers,
    selectedUserId,
    setSelectedUserId,
    selectedUser,
    fromAsset,
    setFromAsset,
    toAsset,
    setToAsset,
    amount,
    setAmount,
    rate,
    loading,
    error,
    estimatedReceive,
    availableBalance,
    insufficientBalance,
    handleSwapAssets,
    handleConvert
  } = useConversion()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold flex items-center gap-3">
          <ArrowUpDown size={27} className="text-blue-400" />
          Conversão de Ativos
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Troque instantaneamente entre cripto e moedas fiduciárias.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Form */}
        <div className="flex-1 space-y-6">
          {/* Usuário */}
          <UserSelect users={activeUsers} selectedUserId={selectedUserId} onChange={setSelectedUserId} />

          {/* Moeda de origem + valor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Moeda de Origem</label>
              <div className="relative">
                <select
                  value={fromAsset}
                  onChange={e => setFromAsset(e.target.value as AssetType)}
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer hover:border-white/20 transition-colors"
                >
                  {ASSETS.map(a => (
                    <option key={a} value={a} className="bg-[#161616]">
                      {a} — {ASSET_NAMES[a]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▾</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Valor de Origem</label>
              <div className="bg-[#161616] border border-white/10 rounded-xl px-4 py-2 hover:border-white/20 transition-colors flex items-center gap-3">
                <span className="text-gray-400 text-sm shrink-0">{ASSET_SYMBOLS[fromAsset]}</span>
                <input
                  type="number"
                  min="0"
                  step="any"
                  placeholder="0.00000"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="flex-1 bg-transparent text-white text-xl font-bold outline-none placeholder-gray-600"
                />
                <button
                  onClick={() => setAmount(availableBalance.toString())}
                  className="text-brand-red text-xs font-semibold hover:text-red-400 transition-colors cursor-pointer shrink-0"
                >
                  MÁX
                </button>
              </div>
              <p className="text-gray-500 text-xs px-1">
                Disponível:{' '}
                <span className="text-white font-medium">
                  {availableBalance.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {fromAsset}
                </span>
              </p>
            </div>
          </div>

          {/* Botão swap */}
          <div className="flex justify-between items-center gap-3">
            <div className="w-[45%] h-px bg-brand-red"></div>
            <button
              onClick={handleSwapAssets}
              className="w-10 h-10 rounded-full my-7 bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <ArrowUpDown size={16} />
            </button>
            <div className="w-[45%] h-px bg-brand-red"></div>
          </div>

          {/* Moeda de destino + valor estimado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Moeda de Destino</label>
              <div className="relative">
                <select
                  value={toAsset}
                  onChange={e => setToAsset(e.target.value as AssetType)}
                  className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none appearance-none cursor-pointer hover:border-white/20 transition-colors"
                >
                  {ASSETS.map(a => (
                    <option key={a} value={a} className="bg-[#161616]">
                      {a} — {ASSET_NAMES[a]}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">▾</div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">Valor Estimado</label>
              <div className="bg-[#161616] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
                <span className="text-gray-400 text-sm shrink-0">{ASSET_SYMBOLS[toAsset]}</span>
                <span className={`text-xl font-bold ${estimatedReceive !== null ? 'text-brand-red' : 'text-gray-600'}`}>
                  {estimatedReceive !== null
                    ? estimatedReceive.toLocaleString('pt-BR', { maximumFractionDigits: 6 })
                    : '0.00000'}
                </span>
              </div>
            </div>
          </div>

          {/* Taxa de câmbio */}
          {rate !== null && (
            <div className="flex items-center justify-between px-4 py-3 bg-white/3 border border-white/5 rounded-xl">
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Info size={13} />
                Taxa de Câmbio: 1 {fromAsset} = {rate.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {toAsset}
              </div>
              <span className="text-gray-500 text-xs">via CoinGecko</span>
            </div>
          )}

          {/* Erro saldo insuficiente */}
          {insufficientBalance && (
            <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-red-400 text-xs font-semibold">Saldo insuficiente para realizar esta conversão</p>
                <p className="text-red-400/70 text-xs mt-0.5">
                  Saldo disponível: {availableBalance.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {fromAsset}
                </p>
              </div>
            </div>
          )}

          {/* Erro API */}
          {error && (
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
              <AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-amber-400 text-xs">{error}</p>
            </div>
          )}

          {/* Botão */}
          <button
            onClick={handleConvert}
            disabled={insufficientBalance || loading}
            className="w-full sm:w-auto bg-brand-red hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                Buscando taxa...
              </>
            ) : (
              <>
                <ArrowUpDown size={18} />
                Converter
              </>
            )}
          </button>
        </div>

        {/* Card lateral */}
        <div className="flex flex-col gap-4 w-full xl:w-72">
          {selectedUser && <UserBalanceCard user={selectedUser} selectedAsset={fromAsset} />}

          {/* Dica de mercado */}
          <div className="bg-[#161616] border border-white/5 rounded-xl p-4 space-y-2">
            <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Saldos Disponíveis</span>
            <div className="space-y-3 pt-1">
              {selectedUser &&
                (['BTC', 'ETH', 'BRL', 'USDT'] as AssetType[]).map(asset => (
                  <div key={asset} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white">
                        {ASSET_ICONS[asset]}
                      </div>
                      <div>
                        <p className="text-white text-xs font-semibold">{asset}</p>
                        <p className="text-gray-500 text-xs">{ASSET_NAMES[asset]}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xs font-medium">
                        {selectedUser.balances[asset].toLocaleString('pt-BR', { maximumFractionDigits: 4 })} {asset}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatBRL(selectedUser.balances[asset] * ASSET_RATES[asset])}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
