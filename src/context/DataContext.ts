import { createContext, useContext } from 'react'
import type { User, Transaction } from '../types/data-types'

export interface DataContextType {
  users: User[]
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void
  updateUserBalance: (userId: number, asset: keyof User['balances'], amount: number) => void
}

export const DataContext = createContext<DataContextType | undefined>(undefined)

export function useData() {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData deve ser usado dentro do DataProvider')
  return context
}
