import { useContext } from 'react'
import { GlobalSettings } from '../context/globalSettingsContext'

import { FilterSort } from './navigation&search_components/FilterSort'
import { PageSelector } from './navigation&search_components/PageSelector'
import { SectionResultados } from './SectionResultados'

export function MainContainer () {
  const { globalSettings } = useContext(GlobalSettings)
  const { theme } = globalSettings

  return (
    <main className={theme + '_Theme'}>
      <FilterSort />
      <PageSelector />
      <SectionResultados />
      <PageSelector />
    </main>
  )
}
