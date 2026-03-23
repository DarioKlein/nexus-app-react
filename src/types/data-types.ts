export type AssetType = 'BRL' | 'BTC' | 'ETH' | 'USDT'

export type UserStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED'

export type TransactionType = 'DEPOSIT' | 'WITHDRAW'

export interface Balance {
  BRL: number
  BTC: number
  ETH: number
  USDT: number
}

export interface User {
  id: number
  name: string
  email: string
  status: UserStatus
  createdAt: string
  lastActivity: string
  balances: Balance
}

export interface Transaction {
  id: number
  userId: number
  userName: string
  type: TransactionType
  asset: AssetType
  amount: number
  observation?: string
  createdAt: string
}
