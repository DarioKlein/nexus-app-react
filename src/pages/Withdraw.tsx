import { useState } from 'react'
import { ArrowUpCircle, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useData } from '../context/DataContext'
import { UserBalanceCard } from '../components/shared/UserBalanceCard'
import { WithdrawSummary } from '../components/withdraw/WithdrawSummary'
import type { AssetType } from '../types/data-types'
import { UserSelect } from '../components/shared/UserSelect'
import { AssetSelect } from '../components/shared/AssetSelect'
import { AmountInput } from '../components/shared/AmountInput'

export function Withdraw() {
  const { users, addTransaction, updateUserBalance } = useData()
  const activeUsers = users.filter(u => u.status === 'ACTIVE')

  const [selectedUserId, setSelectedUserId] = useState<number | null>(activeUsers[0]?.id ?? null)
  const [selectedAsset, setSelectedAsset] = useState<AssetType>('BTC')
  const [amount, setAmount] = useState('')

  const selectedUser = users.find(u => u.id === selectedUserId) ?? null
  const amountNumber = parseFloat(amount.replace(',', '.')) || 0
  const availableBalance = selectedUser?.balances[selectedAsset] ?? 0
  const insufficientBalance = amountNumber > 0 && amountNumber > availableBalance

  function handleWithdraw() {
    if (!selectedUser) {
      toast.error('Selecione um usuário.')
      return
    }
    if (!amountNumber || amountNumber <= 0) {
      toast.error('Informe um valor válido.')
      return
    }
    if (amountNumber > availableBalance) {
      toast.error('Saldo insuficiente para realizar este saque.')
      return
    }

    updateUserBalance(selectedUser.id, selectedAsset, -amountNumber)
    addTransaction({
      userId: selectedUser.id,
      userName: selectedUser.name,
      type: 'WITHDRAW',
      asset: selectedAsset,
      amount: amountNumber,
      createdAt: new Date().toISOString()
    })

    toast.success('Saque realizado com sucesso!')
    setAmount('')
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold flex items-center gap-3">
          <ArrowUpCircle size={27} className="text-red-400" />
          Novo Saque
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Preencha os dados para realizar um saque da plataforma.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <UserSelect users={activeUsers} selectedUserId={selectedUserId} onChange={setSelectedUserId} />
          <AssetSelect selectedAsset={selectedAsset} onChange={setSelectedAsset} />

          <div className="space-y-1">
            <AmountInput selectedAsset={selectedAsset} amount={amount} onChange={setAmount} />
            <div className="flex items-center justify-between px-1">
              <span className="text-gray-500 text-xs flex items-center gap-1">
                Saldo disponível:
                <span className="text-white font-medium">
                  {availableBalance.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {selectedAsset}
                </span>
              </span>
              <button
                onClick={() => setAmount(availableBalance.toString())}
                className="text-brand-red text-xs font-semibold hover:text-red-400 transition-colors cursor-pointer"
              >
                Usar Máximo
              </button>
            </div>

            {insufficientBalance && (
              <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mt-1">
                <AlertCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 text-xs font-semibold">Saldo insuficiente para realizar este saque</p>
                  <p className="text-red-400/70 text-xs mt-0.5">
                    O valor solicitado excede o saldo disponível de{' '}
                    {availableBalance.toLocaleString('pt-BR', { maximumFractionDigits: 6 })} {selectedAsset}.
                  </p>
                </div>
              </div>
            )}
          </div>

          <WithdrawSummary user={selectedUser} selectedAsset={selectedAsset} amount={amountNumber} />

          <button
            onClick={handleWithdraw}
            disabled={insufficientBalance}
            className="w-full sm:w-auto bg-brand-red hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
          >
            <ArrowUpCircle size={18} />
            Solicitar Saque
          </button>
        </div>

        {selectedUser && <UserBalanceCard user={selectedUser} selectedAsset={selectedAsset} />}
      </div>
    </div>
  )
}
