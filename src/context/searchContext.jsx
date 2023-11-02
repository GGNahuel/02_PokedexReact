import { createContext, useEffect, useState } from 'react'
import { useFilterNodes } from '../hooks/useFilterNodes'

export const SearchContext = createContext()

export function SearchContextProvider ({ children }) {
  const [resultsDetails, setResultsDetails] = useState({
    search: null,
    page: 0,
    pageInput: 0,
    filters: {
      generation: '',
      pokedex: [],
      elements: []
    },
    sort: ''
  })

  const { checkboxNames } = useFilterNodes()

  useEffect(() => {
    setResultsDetails(state => ({
      ...state,
      filters: {
        generation: 'all',
        pokedex: checkboxNames.pokedexNames,
        elements: checkboxNames.elementNames
      }
    }))
  }, [])

  return (
    <SearchContext.Provider value={{
      resultsDetails, setResultsDetails
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}
