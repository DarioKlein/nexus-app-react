import type { LucideIcon } from "lucide-react"
import type { InputHTMLAttributes } from "react"

export type InputFieldProps = {
  label: string
  nameInput: string
  icon: LucideIcon
  error?: string
} & InputHTMLAttributes<HTMLInputElement>
