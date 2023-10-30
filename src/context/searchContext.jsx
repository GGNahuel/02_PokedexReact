import { createContext, useState } from 'react'

export const SearchContext = createContext()

export function SearchContextProvider ({ children }) {
  const [resultsDetails, setResultsDetails] = useState({
    search: null,
    page: 0,
    pageInput: 0,
    filters: {
      generation: 'all',
      pokedex: [],
      elements: []
    },
    sort: ''
  })

  const resetFilters = () => {
    setResultsDetails(state => ({
      ...state,
      filters: {
        generation: 'all',
        pokedex: [],
        elements: []
      }
    }))
  }

  return (
    <SearchContext.Provider value={{
      resultsDetails, setResultsDetails, resetFilters
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}
