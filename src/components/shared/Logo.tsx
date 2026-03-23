import { TextAlignJustify } from "lucide-react"

type LogoProps = {
  size?: 'ssm' | 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    ssm: {
      img: 'w-9',
      text: 'text-xl',
      icon: 19.5
    },
    sm: {
      img: 'w-10',
      text: 'text-xl',
      icon: 20
    },
    md: {
      img: 'w-12',
      text: 'text-2xl',
      icon: 24
    },
    lg: {
      img: 'w-15',
      text: 'text-4xl',
      icon: 33
    }
  }

  const current = sizes[size]

  return (
    <div className={`relative z-10 flex items-center gap-3 ${className}`}>
      <img className={current.img} src="favicon.png" alt="Logo Nexus" />
      <span className={`text-white tracking-wide font-poppins font-extrabold flex items-center ${current.text}`}>
        N
        <TextAlignJustify color="var(--color-brand-red)" size={current.icon} strokeWidth="3.5px" />
        XUS
      </span>
    </div>
  )
}
