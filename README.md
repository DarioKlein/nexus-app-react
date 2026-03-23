# Nexus — Plataforma de Gestão de Ativos

Dashboard administrativo para gestão de usuários e operações financeiras com criptomoedas e moeda fiduciária (BRL). Construído com React, TypeScript e Vite.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Execução](#instalação-e-execução)
- [Acesso e Autenticação](#acesso-e-autenticação)
- [Páginas e Módulos](#páginas-e-módulos)
- [Contextos e Estado Global](#contextos-e-estado-global)
- [Hooks Customizados](#hooks-customizados)
- [Tipos e Interfaces](#tipos-e-interfaces)
- [Dados Mockados](#dados-mockados)
- [Configuração de Build e Deploy](#configuração-de-build-e-deploy)

---

## Visão Geral

O **Nexus** é uma aplicação web de página única (SPA) voltada para administradores de uma exchange ou carteira digital. Permite gerenciar usuários, visualizar saldos consolidados, realizar depósitos, saques e conversões de ativos entre BRL, BTC, ETH e USDT — com taxas de câmbio em tempo real via API da CoinGecko.

---

## Funcionalidades

- **Autenticação** com validação de e-mail, senha e status do usuário
- **Dashboard** com KPIs consolidados, lista de transações recentes e distribuição de saldos por ativo
- **Gestão de usuários** com busca, filtro por status e paginação
- **Depósito** de qualquer ativo para usuários ativos, com campo de observação opcional
- **Saque** com validação de saldo, exibição de saldo disponível e botão "Usar Máximo"
- **Conversão de ativos** com taxa de câmbio em tempo real (CoinGecko), fallback local e swap entre pares
- Notificações de sucesso/erro via toast em todas as operações
- Interface responsiva com suporte a mobile e desktop
- Proteção de rotas: apenas usuários autenticados acessam as páginas internas

---

## Tecnologias

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19 | Biblioteca de UI |
| TypeScript | ~5.9 | Tipagem estática |
| Vite | 8 | Build tool e servidor de desenvolvimento |
| Tailwind CSS | 4 | Estilização utilitária |
| React Router DOM | 7 | Roteamento client-side |
| React Toastify | 11 | Notificações em tela |
| Lucide React | 0.577 | Ícones SVG |
| React Icons | 5 | Biblioteca de ícones adicionais |
| @web3icons/react | 4 | Ícones de criptomoedas |
| CoinGecko API | v3 | Taxas de câmbio em tempo real |

---

## Estrutura do Projeto

```
nexus/
├── index.html                  # Ponto de entrada HTML
├── vite.config.ts              # Configuração do Vite
├── tsconfig.json               # Configuração TypeScript
├── package.json                # Dependências e scripts
│
└── src/
    ├── main.tsx                # Bootstrap da aplicação (BrowserRouter)
    ├── App.tsx                 # Rotas principais e layout raiz
    ├── global.css              # Estilos globais e variáveis CSS
    │
    ├── pages/                  # Páginas da aplicação
    │   ├── Login.tsx           # Tela de autenticação
    │   ├── Home.tsx            # Dashboard com KPIs e transações
    │   ├── Users.tsx           # Listagem e filtragem de usuários
    │   ├── Deposit.tsx         # Formulário de depósito
    │   ├── Withdraw.tsx        # Formulário de saque
    │   └── Conversion.tsx      # Conversão entre ativos
    │
    ├── components/
    │   ├── auth/               # Componentes da tela de login
    │   │   ├── AuthHero.tsx    # Painel visual lateral esquerdo
    │   │   ├── InputField.tsx  # Campo de texto genérico
    │   │   └── PasswordField.tsx # Campo de senha com toggle de visibilidade
    │   │
    │   ├── home/               # Componentes do dashboard
    │   │   ├── KpiCards.tsx    # Cards de métricas (usuários, saldo, transações)
    │   │   ├── TransactionList.tsx # Tabela de transações recentes
    │   │   ├── AssetBalances.tsx   # Distribuição de saldos por ativo
    │   │   └── constants.tsx       # Ícones e símbolos dos ativos
    │   │
    │   ├── layout/             # Componentes de layout interno
    │   │   ├── Navbar.tsx          # Barra de navegação superior (mobile)
    │   │   ├── NavItem.tsx         # Item individual de navegação
    │   │   ├── SidebarContent.tsx  # Conteúdo da sidebar lateral
    │   │   ├── SidebarHeader.tsx   # Cabeçalho da sidebar
    │   │   └── UserSection.tsx     # Exibição do usuário logado na sidebar
    │   │
    │   ├── shared/             # Componentes reutilizáveis
    │   │   ├── AmountInput.tsx     # Input de valor monetário/cripto
    │   │   ├── AssetSelect.tsx     # Seletor de ativo (BRL/BTC/ETH/USDT)
    │   │   ├── Logo.tsx            # Logo da plataforma
    │   │   ├── UserBalanceCard.tsx # Card lateral com saldos do usuário
    │   │   └── UserSelect.tsx      # Seletor de usuário ativo
    │   │
    │   └── withdraw/
    │       └── WithdrawSummary.tsx # Resumo de saque antes da confirmação
    │
    ├── context/                # Contextos React (estado global)
    │   ├── AppContext.tsx       # Hook e tipo do contexto de autenticação
    │   ├── AppProvider.tsx      # Provider com estado do usuário logado
    │   ├── DataContext.ts       # Hook e tipo do contexto de dados
    │   ├── DataProvider.tsx     # Provider com usuários e transações
    │   ├── LayoutContext.tsx    # Hook e tipo do contexto de layout
    │   ├── LayoutProvider.tsx   # Provider com estado da sidebar (aberta/fechada)
    │   ├── UsersContext.tsx     # Hook e tipo do contexto de usuários
    │   └── UsersProvider.tsx    # Provider com filtros e paginação de usuários
    │
    ├── hooks/                  # Hooks customizados
    │   ├── useConversion.ts    # Lógica completa da tela de conversão
    │   └── useHomeStats.ts     # Cálculo de KPIs e estatísticas do dashboard
    │
    ├── layouts/
    │   └── AppLayout.tsx       # Layout com sidebar + área de conteúdo
    │
    ├── routes/
    │   └── ProtectedRoute.tsx  # Guard de rota: redireciona para /login se não autenticado
    │
    ├── mocks/                  # Dados simulados
    │   ├── index.ts            # Re-exportações centralizadas
    │   ├── users.ts            # 12 usuários mockados com saldos
    │   └── transactions.ts     # Histórico de transações mockadas
    │
    ├── types/                  # Definições de tipos TypeScript
    │   ├── data-types.ts       # User, Transaction, Balance, AssetType, etc.
    │   ├── field-types.ts      # Tipos para campos de formulário
    │   └── home-types.ts       # Tipos para props dos componentes do dashboard
    │
    └── utils/
        └── validateLogin.ts    # Validação dos campos de e-mail e senha
```

---

## Instalação e Execução

### Pré-requisitos

- Node.js 20+
- Yarn ou npm

### Passos

```bash
# Clone o repositório
git clone <url-do-repositório>
cd nexus

# Instale as dependências
yarn install
# ou
npm install

# Inicie o servidor de desenvolvimento
yarn dev
# ou
npm run dev
```

A aplicação estará disponível em `http://localhost:5000`.

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `yarn dev` | Inicia o servidor de desenvolvimento na porta 5000 |
| `yarn build` | Compila TypeScript e gera o build de produção na pasta `dist/` |
| `yarn preview` | Pré-visualiza o build de produção localmente |
| `yarn lint` | Executa o ESLint no código-fonte |

---

## Acesso e Autenticação

O sistema utiliza dados mockados para autenticação. Qualquer usuário com status `ACTIVE` pode fazer login.

**Senha universal (todos os usuários):** `123456`

### Usuários disponíveis para login

| Nome | E-mail | Status |
|---|---|---|
| Ana Paula Ferreira | ana.ferreira@email.com | ACTIVE |
| Carlos Eduardo Lima | carlos.lima@email.com | ACTIVE |
| Juliana Costa | juliana.costa@email.com | ACTIVE |
| Felipe Mendes | felipe.mendes@email.com | ACTIVE |
| Thiago Nascimento | thiago.nascimento@email.com | ACTIVE |
| Diego Carvalho | diego.carvalho@email.com | ACTIVE |
| Camila Teixeira | camila.teixeira@email.com | ACTIVE |
| Mariana Souza | mariana.souza@email.com | PENDING (bloqueado) |
| Roberto Alves | roberto.alves@email.com | BLOCKED (bloqueado) |

> Usuários com status `PENDING` ou `BLOCKED` não conseguem acessar o sistema.

---

## Páginas e Módulos

### `/login` — Autenticação

Tela de login com dois painéis: um hero visual à esquerda e o formulário à direita. Realiza validação de formato de e-mail e comprimento de senha antes de checar as credenciais nos dados mockados. Exibe toast de erro em caso de credenciais inválidas ou usuário bloqueado/pendente.

### `/home` — Dashboard

Exibe uma visão consolidada da plataforma em tempo real:

- **KPI Cards:** total de usuários, usuários ativos, saldo consolidado em BRL e total de transações
- **Transações Recentes:** lista das últimas operações de todos os usuários
- **Distribuição de Ativos:** gráfico de barras mostrando o saldo de cada criptomoeda com valores em BRL

### `/users` — Usuários

Tabela completa dos usuários com:

- Busca por nome ou e-mail
- Filtro por status (Todos / Ativo / Pendente / Bloqueado)
- Paginação de resultados
- Exibição de saldos por ativo e data da última atividade

### `/deposit` — Depósito

Formulário para creditar ativos na conta de um usuário ativo:

1. Selecionar o usuário
2. Escolher o ativo (BRL, BTC, ETH, USDT)
3. Informar o valor
4. Campo de observação opcional (nota fiscal, referência, ID externo)

O saldo do usuário é atualizado em tempo real no card lateral após a operação.

### `/withdraw` — Saque

Formulário para debitar ativos da conta de um usuário:

1. Selecionar o usuário
2. Escolher o ativo
3. Informar o valor (ou clicar em "Usar Máximo")

Possui validação de saldo insuficiente com alerta visual antes mesmo de confirmar. O botão de saque fica desabilitado caso o valor exceda o saldo disponível.

### `/conversion` — Conversão de Ativos

Permite converter saldo de um ativo para outro (ex: BTC → BRL, ETH → USDT):

- Taxa de câmbio consultada em tempo real via **CoinGecko API**
- Fallback com taxas fixas locais caso a API não responda
- Botão de swap para inverter o par de ativos rapidamente
- Estimativa de recebimento exibida antes de confirmar
- Registra duas transações: um saque do ativo de origem e um depósito no ativo de destino

---

## Contextos e Estado Global

A aplicação gerencia estado via **React Context API**, dividido em responsabilidades:

| Contexto | Arquivo | Responsabilidade |
|---|---|---|
| `AppContext` | `AppProvider.tsx` | Usuário autenticado, funções `login()` e `logout()` |
| `DataContext` | `DataProvider.tsx` | Lista de usuários e transações, `addTransaction()`, `updateUserBalance()` |
| `LayoutContext` | `LayoutProvider.tsx` | Estado da sidebar (aberta/fechada) para responsividade |
| `UsersContext` | `UsersProvider.tsx` | Filtros, busca e paginação da listagem de usuários |

---

## Hooks Customizados

### `useHomeStats`

Calcula todas as métricas exibidas no dashboard:

- `totalUsers` — total de usuários cadastrados
- `activeUsers` — usuários com status ACTIVE
- `totalConsolidatedBRL` — soma de todos os saldos convertidos para BRL
- `totalTransactions` — total de transações registradas
- `recentTransactions` — últimas 10 transações ordenadas por data
- `consolidated` — saldo total de cada ativo (BTC, ETH, BRL, USDT)
- `maxBalance` — maior saldo entre os ativos (para normalização da barra de progresso)

### `useConversion`

Encapsula toda a lógica da tela de conversão:

- Gerencia estados de `fromAsset`, `toAsset`, `amount`, `rate`, `loading` e `error`
- Busca taxa de câmbio na CoinGecko com fallback local
- Executa `handleConvert()` com validações e atualiza os dois saldos do usuário
- `handleSwapAssets()` inverte o par selecionado
- Calcula `estimatedReceive` e `insufficientBalance` em tempo real

---

## Tipos e Interfaces

Definidos em `src/types/data-types.ts`:

```typescript
type AssetType = 'BRL' | 'BTC' | 'ETH' | 'USDT'
type UserStatus = 'ACTIVE' | 'PENDING' | 'BLOCKED'
type TransactionType = 'DEPOSIT' | 'WITHDRAW'

interface Balance {
  BRL: number
  BTC: number
  ETH: number
  USDT: number
}

interface User {
  id: number
  name: string
  email: string
  status: UserStatus
  createdAt: string
  lastActivity: string
  balances: Balance
}

interface Transaction {
  id: number
  userId: number
  userName: string
  type: TransactionType
  asset: AssetType
  amount: number
  observation?: string
  createdAt: string
}
```

---

## Dados Mockados

Localizados em `src/mocks/`, os dados simulam um banco de dados em memória:

- **12 usuários** com saldos variados em BRL, BTC, ETH e USDT
- **Histórico de transações** pré-carregado para popular o dashboard
- Os dados são mantidos em estado React durante a sessão — operações de depósito, saque e conversão atualizam os saldos em tempo real, mas são perdidas ao recarregar a página

---