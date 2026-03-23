import { useState, type ReactNode } from 'react'
import { DataContext } from './DataContext'
import { mockUsers } from '../mocks/users'
import { mockTransactions } from '../mocks/transactions'
import type { User, Transaction } from '../types/data-types'

export function DataProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)

  function addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction: Transaction = {
      ...transaction,
      id: transactions.length + 1
    }
    setTransactions(prev => [...prev, newTransaction])
  }

  function updateUserBalance(userId: number, asset: keyof User['balances'], amount: number) {
    setUsers(prev =>
      prev.map(u => (u.id === userId ? { ...u, balances: { ...u.balances, [asset]: u.balances[asset] + amount } } : u))
    )
  }

  return (
    <DataContext.Provider value={{ users, transactions, addTransaction, updateUserBalance }}>
      {children}
    </DataContext.Provider>
  )
}
