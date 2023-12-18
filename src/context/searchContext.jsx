import { createContext, useState } from 'react'

export const SearchContext = createContext()

export function SearchContextProvider ({ children }) {
  const [resultsDetails, setResultsDetails] = useState({
    page: 1,
    totalPages: 0,
    filters: {
      search: '',
      generation: 'all',
      pokedex: [],
      elements: []
    },
    sort: 'default'
  })

  return (
    <SearchContext.Provider value={{
      resultsDetails, setResultsDetails
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}
