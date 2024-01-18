import { createContext, useState } from 'react'

export const GlobalSettings = createContext()

export function GlobalSettingsProvider ({ children }) {
  const [globalSettings, setGlobalSettings] = useState({
    theme: 'light',
    lang: 'en'
  })

  return (
    <GlobalSettings.Provider value={{ globalSettings, setGlobalSettings }}>
      {children}
    </GlobalSettings.Provider>
  )
}
