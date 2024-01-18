import { SearchContextProvider } from './context/searchContext'
import { GlobalSettingsProvider } from './context/globalSettingsContext'

import { Nav } from './components/navigation&search_components/Navigation'

import { MainContainer } from './components/MainContainer'
import './styles.css'

export function App () {
  return (
    <GlobalSettingsProvider>
      <SearchContextProvider>
        <Nav />
        <MainContainer />
      </SearchContextProvider>
    </GlobalSettingsProvider>
  )
}
