import { FaBrazilianRealSign } from 'react-icons/fa6'
import { TokenETH, TokenUSDT } from '@web3icons/react'
import { SiBitcoinsv } from 'react-icons/si'

export const ASSET_SYMBOLS: Record<string, string> = {
  BRL: 'R$',
  BTC: 'BTC',
  ETH: 'ETH',
  USDT: 'USDT'
}

export const ASSET_ICONS: Record<string, React.ReactNode> = {
  BRL: <FaBrazilianRealSign size={15} />,
  BTC: <SiBitcoinsv size={20} className="text-amber-300" />,
  ETH: <TokenETH size={40} />,
  USDT: <TokenUSDT size={27} />
}
