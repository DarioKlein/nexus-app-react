import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { InputFieldProps } from '../../types/field-types'

export function PasswordField({ label, nameInput, icon: Icon, error, ...props }: InputFieldProps) {
  const [show, setShow] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white text-lg font-medium" htmlFor={nameInput}>
        {label}
      </label>

      <div className="relative">
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white" />
        <input
          type={show ? 'text' : 'password'}
          {...props}
          id={nameInput}
          className={`w-full bg-brand-panel border ${error ? 'border-brand-red' : 'border-brand-gray'} text-white rounded-lg pl-10 pr-4 py-3 text-lg focus:outline-none focus:border-brand-red transition-colors`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
        >
          {show ? <EyeOff className="w-5 h-5 cursor-pointer" /> : <Eye className="w-5 h-5 cursor-pointer" />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}
