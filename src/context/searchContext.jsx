import { createContext, useEffect, useState } from 'react'

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

  const [checkboxNames, setCheckboxNames] = useState({
    pokedexNames: [],
    elementNames: []
  })

  useEffect(() => {
    const SUFIX_LIMIT_API = '?limit=100/'
    async function getCheckboxNames () {
      const apiPokedex = await fetch('https://pokeapi.co/api/v2/pokedex/' + SUFIX_LIMIT_API)
      const dataPokedex = await apiPokedex.json()
      const pokedexes = dataPokedex.results.map(pokedex => pokedex.name)
      setCheckboxNames(prevState => ({
        ...prevState, pokedexNames: pokedexes
      }))

      const apiTypes = await fetch('https://pokeapi.co/api/v2/type/' + SUFIX_LIMIT_API)
      const dataTypes = await apiTypes.json()
      const types = dataTypes.results.map(element => element.name.toUpperCase())
      setCheckboxNames(prevState => ({
        ...prevState, elementNames: types
      }))

      setResultsDetails(state => ({
        ...state,
        filters: {
          generation: 'all',
          pokedex: checkboxNames.pokedexNames,
          elements: checkboxNames.elementNames
        }
      }))
    } getCheckboxNames()
  }, [])

  return (
    <SearchContext.Provider value={{
      resultsDetails, setResultsDetails, checkboxNames
    }}
    >
      {children}
    </SearchContext.Provider>
  )
}
