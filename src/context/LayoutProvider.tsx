import { useState, type ReactNode } from "react"
import { LayoutContext } from "./LayoutContext"

export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <LayoutContext.Provider value={{ collapsed, setCollapsed, mobileOpen, setMobileOpen }}>
      {children}
    </LayoutContext.Provider>
  )
}
