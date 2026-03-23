import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ShieldCheck, LogIn, ShieldAlert } from 'lucide-react'
import { toast } from 'react-toastify'
import { mockUsers } from '../mocks'
import { useApp } from '../context/AppContext'
import { validateLogin } from '../utils/validateLogin'

import { PasswordField } from '../components/auth/PasswordField'
import { Logo } from '../components/shared/Logo'
import { AuthHero } from '../components/auth/AuthHero'
import { InputField } from '../components/auth/InputField'

export function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const { login } = useApp()

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault()
    const { valid, errors } = validateLogin(email, password)
    setErrors(errors)

    if (!valid) return

    const MOCK_PASSWORD = '123456'
    const user = mockUsers.find(u => u.email === email)

    if (!user || password !== MOCK_PASSWORD) {
      toast.error('Usuário ou senha incorretos.')
      return
    }

    if (user.status != 'ACTIVE') {
      switch (user.status) {
        case 'BLOCKED':
          toast.warning('O Usuário está bloqueado.')
          break
        case 'PENDING':
          toast.warning('O Usuário está pendente.')
          break
        default:
          toast.warning('O Usuári não tem permissão para login')
      }
      return
    }

    login(user)
    toast.success('Login realizado com sucesso!')
    navigate('/home')
  }

  return (
    <div className="h-dvh md:min-h-screen bg-brand-background flex">
      <AuthHero />
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16 bg-brand-background relative">
        <div
          className="absolute md:hidden w-full h-full bg-amber-50"
          style={{ opacity: 0.15, background: 'radial-gradient(ellipse at 50% 50%, #ff3131 0%, transparent 90%)' }}
        ></div>
        <div className="w-full max-w-md space-y-8">
          <Logo size="lg" className="-top-7 md:hidden" />
          <div>
            <h2 className="text-white text-3xl font-bold flex items-center gap-2">
              <LogIn size={30} color="var(--color-brand-red)" />
              Bem-vindo de volta
            </h2>
            <p className="text-gray-300  md:text-lg mt-2 flex gap-2 items-center">
              Entre com suas credenciais para acessar sua conta
              <ShieldAlert className="hidden md:flex" color="var(--color-brand-red)" />
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              type="text"
              label="E-mail"
              nameInput="email"
              icon={Mail}
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              error={errors.email}
            />
            <PasswordField
              label="Senha"
              nameInput="password"
              icon={Lock}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••"
              error={errors.password}
            />
            <button
              type="submit"
              className="w-full relative cursor-pointer z-10 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition-colors text-sm mt-2"
            >
              Entrar
            </button>
          </form>
          <div className="flex items-center justify-center gap-2 border border-brand-gray rounded-lg py-3 px-4">
            <ShieldCheck className="w-4 h-4 text-brand-gray" />
            <span className="text-brand-gray text-xs">Conexão Segura · Criptografia SSL 256-bit</span>
          </div>
        </div>
      </div>
    </div>
  )
}
