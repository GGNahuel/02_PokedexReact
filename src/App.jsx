import { SearchContextProvider } from './context/searchContext'

import { Nav } from './components/navigation&search_components/Navigation'
import { PageSelector } from './components/navigation&search_components/PageSelector'
import { SectionResultados } from './components/SectionResultados'
import { FilterSort } from './components/navigation&search_components/FilterSort'

import './styles.css'

export function App () {
  return (
    <SearchContextProvider>
      <Nav />
      <main className='light'>
        <FilterSort />
        <PageSelector />
        <SectionResultados />
        <PageSelector />
      </main>
    </SearchContextProvider>
  )
}
