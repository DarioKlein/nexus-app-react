import { useState } from 'react'
import { ArrowDownCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { useData } from '../context/DataContext'
import type { AssetType } from '../types/data-types'
import { UserBalanceCard } from '../components/shared/UserBalanceCard'
import { UserSelect } from '../components/shared/UserSelect'
import { AssetSelect } from '../components/shared/AssetSelect'
import { AmountInput } from '../components/shared/AmountInput'

export function Deposit() {
  const { users, addTransaction, updateUserBalance } = useData()
  const activeUsers = users.filter(u => u.status === 'ACTIVE')

  const [selectedUserId, setSelectedUserId] = useState<number | null>(activeUsers[0]?.id ?? null)
  const [selectedAsset, setSelectedAsset] = useState<AssetType>('BTC')
  const [amount, setAmount] = useState('')
  const [observation, setObservation] = useState('')

  const selectedUser = users.find(u => u.id === selectedUserId) ?? null
  const amountNumber = parseFloat(amount.replace(',', '.')) || 0

  function handleDeposit() {
    if (!selectedUser) {
      toast.error('Selecione um usuário.')
      return
    }
    if (!amountNumber || amountNumber <= 0) {
      toast.error('Informe um valor válido.')
      return
    }

    updateUserBalance(selectedUser.id, selectedAsset, amountNumber)
    addTransaction({
      userId: selectedUser.id,
      userName: selectedUser.name,
      type: 'DEPOSIT',
      asset: selectedAsset,
      amount: amountNumber,
      observation: observation || undefined,
      createdAt: new Date().toISOString()
    })

    toast.success('Depósito realizado com sucesso!')
    setAmount('')
    setObservation('')
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-white text-2xl font-bold flex items-center gap-3">
          <ArrowDownCircle size={27} className="text-emerald-400" />
          Novo Depósito
        </h1>
        <p className="text-gray-500 text-sm mt-0.5">Preencha os dados para depositar seu dinheiro na plataforma.</p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <UserSelect users={activeUsers} selectedUserId={selectedUserId} onChange={setSelectedUserId} />
          <AssetSelect selectedAsset={selectedAsset} onChange={setSelectedAsset} />
          <AmountInput selectedAsset={selectedAsset} amount={amount} onChange={setAmount} />

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wider">
              Observação <span className="normal-case text-gray-600">(opcional)</span>
            </label>
            <textarea
              placeholder="Nota fiscal, referência ou ID externo..."
              value={observation}
              onChange={e => setObservation(e.target.value)}
              rows={3}
              className="w-full bg-[#161616] border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-gray-600 hover:border-white/20 transition-colors resize-none"
            />
          </div>

          <button
            onClick={handleDeposit}
            className="w-full sm:w-auto bg-brand-red hover:bg-red-500 text-white font-semibold px-8 py-3 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
          >
            <ArrowDownCircle size={18} />
            Realizar Depósito
          </button>
        </div>

        {selectedUser && <UserBalanceCard user={selectedUser} selectedAsset={selectedAsset} />}
      </div>
    </div>
  )
}
