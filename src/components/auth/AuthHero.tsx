import { Logo } from "../shared/Logo";


export function AuthHero() {
  return (
    <div
      className="hidden lg:flex flex-col justify-between w-1/2 p-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #1a0000 0%, #000 40%, #1a0000 100%)' }}
    >
      <div
        className="absolute inset-0"
        style={{ opacity: 0.1, background: 'radial-gradient(ellipse at 30% 50%, #ff3131 0%, transparent 70%)' }}
      />
      <div
        className="absolute rounded-full"
        style={{ bottom: -128, left: -128, width: 384, height: 384, opacity: 0.05, background: '#ff3131' }}
      />
      <div
        className="absolute rounded-full"
        style={{ top: -80, right: -80, width: 288, height: 288, opacity: 0.05, background: '#ff3131' }}
      />
      <Logo size="md" />
      <div className="relative z-10 space-y-8">
        <div>
          <span className="inline-flex items-center gap-2 border border-red-600/50 text-brand-red text-sm px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
            Plataforma Financeira de Cripto
          </span>
          <h1 className="text-5xl font-bold text-white leading-tight mt-4">
            Gerencie seus <span className="text-brand-red">ativos digitais</span> com confiança
          </h1>
        </div>
        <p className="text-brand-gray  text-base leading-relaxed max-w-sm">
          Acesse sua carteira, monitore portfólios e execute operações com total segurança na plataforma Nexus.
        </p>
        <div className="flex gap-10">
          <div>
            <p className="text-white text-2xl font-bold">250K+</p>
            <p className="text-brand-gray text-sm mt-0.5">Usuários ativos</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">$4.2B</p>
            <p className="text-brand-gray  text-sm mt-0.5">Volume diário</p>
          </div>
          <div>
            <p className="text-white text-2xl font-bold">180+</p>
            <p className="text-brand-gray  text-sm mt-0.5">Criptomoedas</p>
          </div>
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-brand-gray text-sm">© 2026 Nexus. Todos os direitos reservados.</p>
      </div>
    </div>
  )
}
