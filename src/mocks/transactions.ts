import type { Transaction } from '../types/data-types'

export const mockTransactions: Transaction[] = [
  {
    id: 1,
    userId: 1,
    userName: 'Ana Paula Ferreira',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 5000.0,
    observation: 'Depósito via PIX',
    createdAt: '2025-03-20T14:32:00Z'
  },
  {
    id: 2,
    userId: 5,
    userName: 'Juliana Costa',
    type: 'DEPOSIT',
    asset: 'BTC',
    amount: 0.05,
    observation: 'Transferência externa',
    createdAt: '2025-03-20T13:10:00Z'
  },
  {
    id: 3,
    userId: 8,
    userName: 'Thiago Nascimento',
    type: 'WITHDRAW',
    asset: 'BRL',
    amount: 2000.0,
    createdAt: '2025-03-19T22:45:00Z'
  },
  {
    id: 4,
    userId: 2,
    userName: 'Carlos Eduardo Lima',
    type: 'DEPOSIT',
    asset: 'USDT',
    amount: 200.0,
    observation: 'Compra na exchange',
    createdAt: '2025-03-19T18:00:00Z'
  },
  {
    id: 5,
    userId: 6,
    userName: 'Felipe Mendes',
    type: 'WITHDRAW',
    asset: 'ETH',
    amount: 0.3,
    createdAt: '2025-03-19T11:20:00Z'
  },
  {
    id: 6,
    userId: 11,
    userName: 'Camila Teixeira',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 10000.0,
    observation: 'Aporte mensal',
    createdAt: '2025-03-18T09:00:00Z'
  },
  {
    id: 7,
    userId: 10,
    userName: 'Diego Carvalho',
    type: 'WITHDRAW',
    asset: 'USDT',
    amount: 500.0,
    createdAt: '2025-03-18T08:30:00Z'
  },
  {
    id: 8,
    userId: 1,
    userName: 'Ana Paula Ferreira',
    type: 'DEPOSIT',
    asset: 'ETH',
    amount: 0.5,
    createdAt: '2025-03-17T21:15:00Z'
  },
  {
    id: 9,
    userId: 5,
    userName: 'Juliana Costa',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 25000.0,
    observation: 'TED bancário',
    createdAt: '2025-03-17T16:40:00Z'
  },
  {
    id: 10,
    userId: 8,
    userName: 'Thiago Nascimento',
    type: 'DEPOSIT',
    asset: 'BTC',
    amount: 0.02,
    createdAt: '2025-03-17T10:05:00Z'
  },
  {
    id: 11,
    userId: 6,
    userName: 'Felipe Mendes',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 3000.0,
    observation: 'PIX recebido',
    createdAt: '2025-03-16T19:30:00Z'
  },
  {
    id: 12,
    userId: 2,
    userName: 'Carlos Eduardo Lima',
    type: 'WITHDRAW',
    asset: 'BRL',
    amount: 800.0,
    createdAt: '2025-03-16T14:00:00Z'
  },
  {
    id: 13,
    userId: 11,
    userName: 'Camila Teixeira',
    type: 'WITHDRAW',
    asset: 'ETH',
    amount: 0.6,
    observation: 'Saque para cold wallet',
    createdAt: '2025-03-15T11:50:00Z'
  },
  {
    id: 14,
    userId: 10,
    userName: 'Diego Carvalho',
    type: 'DEPOSIT',
    asset: 'BTC',
    amount: 0.01,
    createdAt: '2025-03-15T09:20:00Z'
  },
  {
    id: 15,
    userId: 5,
    userName: 'Juliana Costa',
    type: 'WITHDRAW',
    asset: 'USDT',
    amount: 1500.0,
    createdAt: '2025-03-14T20:00:00Z'
  },
  {
    id: 16,
    userId: 1,
    userName: 'Ana Paula Ferreira',
    type: 'WITHDRAW',
    asset: 'BRL',
    amount: 1500.0,
    observation: 'Pagamento de conta',
    createdAt: '2025-03-14T15:45:00Z'
  },
  {
    id: 17,
    userId: 8,
    userName: 'Thiago Nascimento',
    type: 'DEPOSIT',
    asset: 'USDT',
    amount: 1000.0,
    createdAt: '2025-03-13T12:30:00Z'
  },
  {
    id: 18,
    userId: 6,
    userName: 'Felipe Mendes',
    type: 'WITHDRAW',
    asset: 'BRL',
    amount: 1200.0,
    createdAt: '2025-03-13T10:10:00Z'
  },
  {
    id: 19,
    userId: 2,
    userName: 'Carlos Eduardo Lima',
    type: 'DEPOSIT',
    asset: 'ETH',
    amount: 0.25,
    observation: 'Compra OTC',
    createdAt: '2025-03-12T17:00:00Z'
  },
  {
    id: 20,
    userId: 10,
    userName: 'Diego Carvalho',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 4000.0,
    createdAt: '2025-03-12T08:50:00Z'
  },
  {
    id: 21,
    userId: 11,
    userName: 'Camila Teixeira',
    type: 'DEPOSIT',
    asset: 'BTC',
    amount: 0.04,
    observation: 'DCA mensal',
    createdAt: '2025-03-11T14:25:00Z'
  },
  {
    id: 22,
    userId: 5,
    userName: 'Juliana Costa',
    type: 'DEPOSIT',
    asset: 'ETH',
    amount: 2.0,
    createdAt: '2025-03-11T11:00:00Z'
  },
  {
    id: 23,
    userId: 1,
    userName: 'Ana Paula Ferreira',
    type: 'DEPOSIT',
    asset: 'USDT',
    amount: 400.0,
    createdAt: '2025-03-10T20:20:00Z'
  },
  {
    id: 24,
    userId: 8,
    userName: 'Thiago Nascimento',
    type: 'WITHDRAW',
    asset: 'BTC',
    amount: 0.03,
    observation: 'Envio para parceiro',
    createdAt: '2025-03-10T09:40:00Z'
  },
  {
    id: 25,
    userId: 6,
    userName: 'Felipe Mendes',
    type: 'DEPOSIT',
    asset: 'USDT',
    amount: 750.0,
    createdAt: '2025-03-09T16:15:00Z'
  },
  {
    id: 26,
    userId: 10,
    userName: 'Diego Carvalho',
    type: 'WITHDRAW',
    asset: 'ETH',
    amount: 0.4,
    createdAt: '2025-03-09T13:00:00Z'
  },
  {
    id: 27,
    userId: 2,
    userName: 'Carlos Eduardo Lima',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 1500.0,
    observation: 'Aporte inicial',
    createdAt: '2025-03-08T10:30:00Z'
  },
  {
    id: 28,
    userId: 11,
    userName: 'Camila Teixeira',
    type: 'WITHDRAW',
    asset: 'BRL',
    amount: 3000.0,
    createdAt: '2025-03-07T18:50:00Z'
  },
  {
    id: 29,
    userId: 5,
    userName: 'Juliana Costa',
    type: 'DEPOSIT',
    asset: 'BTC',
    amount: 0.1,
    observation: 'Transferência Binance',
    createdAt: '2025-03-06T14:10:00Z'
  },
  {
    id: 30,
    userId: 1,
    userName: 'Ana Paula Ferreira',
    type: 'DEPOSIT',
    asset: 'BRL',
    amount: 8000.0,
    observation: 'Depósito TED',
    createdAt: '2025-03-05T09:00:00Z'
  },
  {
    id: 31,
    userId: 8,
    userName: 'Thiago Nascimento',
    type: 'DEPOSIT',
    asset: 'ETH',
    amount: 1.5,
    createdAt: '2025-03-04T11:30:00Z'
  },
  {
    id: 32,
    userId: 10,
    userName: 'Diego Carvalho',
    type: 'WITHDRAW',
    asset: 'USDT',
    amount: 300.0,
    createdAt: '2025-03-03T16:00:00Z'
  }
]
