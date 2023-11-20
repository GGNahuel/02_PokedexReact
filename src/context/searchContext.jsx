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

  const [filtersDefault, setFiltersDefault] = useState({})

  const { checkboxNames } = useFilterNodes()

  useEffect(() => {
    async function setStates () {
      const newFilters = {
        generation: 'all',
        pokedex: checkboxNames.pokedexNames,
        elements: checkboxNames.elementNames
      }
      setFiltersDefault(newFilters)
      setResultsDetails(state => ({
        ...state,
        filters: newFilters
      }))
      console.log(newFilters)
    }
    setStates()
  }, [])

  return (
    <SearchContext.Provider value={{
      resultsDetails, filtersDefault, setResultsDetails
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}
