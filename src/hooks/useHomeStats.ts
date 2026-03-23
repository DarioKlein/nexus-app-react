import { useData } from '../context/DataContext'

const RATES: Record<string, number> = { BRL: 1, BTC: 350000, ETH: 18000, USDT: 5.7 }

export function useHomeStats() {
  const { users, transactions } = useData()

  const deposits = transactions.filter(t => t.type === 'DEPOSIT')
  const withdraws = transactions.filter(t => t.type === 'WITHDRAW')
  const activeUsers = users.filter(u => u.status === 'ACTIVE').length
  const totalDeposited = deposits.reduce((acc, t) => acc + t.amount * RATES[t.asset], 0)
  const totalWithdrawn = withdraws.reduce((acc, t) => acc + t.amount * RATES[t.asset], 0)
  const totalVolumeBRL = users.reduce(
    (acc, u) =>
      acc +
      u.balances.BRL * RATES.BRL +
      u.balances.BTC * RATES.BTC +
      u.balances.ETH * RATES.ETH +
      u.balances.USDT * RATES.USDT,
    0
  )
  const consolidated = users.reduce(
    (acc, u) => ({
      BRL: acc.BRL + u.balances.BRL,
      BTC: acc.BTC + u.balances.BTC,
      ETH: acc.ETH + u.balances.ETH,
      USDT: acc.USDT + u.balances.USDT
    }),
    { BRL: 0, BTC: 0, ETH: 0, USDT: 0 }
  )

  const totalConsolidatedBRL =
    consolidated.BRL + consolidated.BTC * 350000 + consolidated.ETH * 18000 + consolidated.USDT * 5.7

  const maxBalance = Math.max(...Object.values(consolidated).map((v, i) => v * Object.values(RATES)[i]))

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8)

  return {
    activeUsers,
    totalDeposited,
    totalWithdrawn,
    totalVolumeBRL,
    consolidated,
    totalConsolidatedBRL,
    maxBalance,
    recentTransactions
  }
}
