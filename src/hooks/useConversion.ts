import { useState } from 'react'
import { useData } from '../context/DataContext'
import { toast } from 'react-toastify'
import type { AssetType } from '../types/data-types'

const COINGECKO_IDS: Record<AssetType, string> = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  USDT: 'tether',
  BRL: 'brl'
}

const ASSET_RATES_FALLBACK: Record<AssetType, number> = {
  BRL: 1,
  BTC: 350000,
  ETH: 18000,
  USDT: 5.7
}

async function fetchRate(from: AssetType, to: AssetType): Promise<number> {
  if (from === to) return 1

  // BRL é fiat, não tem ID na CoinGecko
  if (from === 'BRL' && to !== 'BRL') {
    const id = COINGECKO_IDS[to]
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=brl`)
    const data = await res.json()
    return 1 / data[id].brl
  }

  if (to === 'BRL') {
    const id = COINGECKO_IDS[from]
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=brl`)
    const data = await res.json()
    return data[id].brl
  }

  // crypto -> crypto (via BRL intermediário)
  const fromId = COINGECKO_IDS[from]
  const toId = COINGECKO_IDS[to]
  const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${fromId},${toId}&vs_currencies=brl`)
  const data = await res.json()
  const fromInBRL = data[fromId].brl
  const toInBRL = data[toId].brl
  return fromInBRL / toInBRL
}

export function useConversion() {
  const { users, updateUserBalance, addTransaction } = useData()
  const activeUsers = users.filter(u => u.status === 'ACTIVE')

  const [selectedUserId, setSelectedUserId] = useState<number | null>(activeUsers[0]?.id ?? null)
  const [fromAsset, setFromAsset] = useState<AssetType>('BTC')
  const [toAsset, setToAsset] = useState<AssetType>('BRL')
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedUser = users.find(u => u.id === selectedUserId) ?? null
  const amountNumber = parseFloat(amount.replace(',', '.')) || 0
  const estimatedReceive =
    amountNumber > 0
      ? rate !== null
        ? amountNumber * rate
        : amountNumber * (ASSET_RATES_FALLBACK[fromAsset] / ASSET_RATES_FALLBACK[toAsset])
      : null
  const availableBalance = selectedUser?.balances[fromAsset] ?? 0
  const insufficientBalance = amountNumber > 0 && amountNumber > availableBalance

  function handleSwapAssets() {
    setFromAsset(toAsset)
    setToAsset(fromAsset)
    setRate(null)
    setAmount('')
  }

  async function handleConvert() {
    if (!selectedUser) {
      toast.error('Selecione um usuário.')
      return
    }
    if (!amountNumber || amountNumber <= 0) {
      toast.error('Informe um valor válido.')
      return
    }
    if (fromAsset === toAsset) {
      toast.error('Selecione ativos diferentes.')
      return
    }
    if (amountNumber > availableBalance) {
      toast.error('Saldo insuficiente para realizar esta conversão.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const fetchedRate = await fetchRate(fromAsset, toAsset)
      setRate(fetchedRate)
      const received = amountNumber * fetchedRate

      updateUserBalance(selectedUser.id, fromAsset, -amountNumber)
      updateUserBalance(selectedUser.id, toAsset, received)

      addTransaction({
        userId: selectedUser.id,
        userName: selectedUser.name,
        type: 'WITHDRAW',
        asset: fromAsset,
        amount: amountNumber,
        observation: `Conversão para ${toAsset}`,
        createdAt: new Date().toISOString()
      })

      addTransaction({
        userId: selectedUser.id,
        userName: selectedUser.name,
        type: 'DEPOSIT',
        asset: toAsset,
        amount: received,
        observation: `Conversão de ${fromAsset}`,
        createdAt: new Date().toISOString()
      })

      toast.success(
        `Conversão realizada! Recebido: ${received.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} ${toAsset}`
      )
      setAmount('')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Erro ao buscar taxa de câmbio. Tente novamente.')
      toast.error('Erro ao buscar taxa de câmbio.')
    } finally {
      setLoading(false)
    }
  }

  return {
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
    handleConvert,
    fallbackRates: ASSET_RATES_FALLBACK
  }
}
