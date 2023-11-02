import { useEffect, useState } from 'react'

export function useFilterNodes () {
  const [filterNodes, setFilterNodes] = useState({
    generation: [],
    pokedex: [],
    elements: []
  })
  const [checkboxNames, setCheckboxNames] = useState({
    pokedexNames: [],
    elementNames: []
  })
  // const { checkboxNames, getCheckboxNames } = useContext(SearchContext)

  useEffect(() => {
    async function getFilterList () {
      const SUFIX_LIMIT_API = '?limit=100/'
      try {
        const apiGenerations = await fetch('https://pokeapi.co/api/v2/generation/' + SUFIX_LIMIT_API)
        const dataGenerations = await apiGenerations.json()
        const generations = dataGenerations.results.map(generation => generation.name)
        setFilterNodes(prevState => ({
          ...prevState,
          generation: generations.map(generation => (
            <label key={generation}><input type='radio' name='generation_filter' value={generation} /> {generation}</label>
          ))
        }))

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

        setFilterNodes(prevState => ({
          ...prevState,
          pokedex: pokedexes.map(pokedexName => (
            <label key={pokedexName}><input type='checkbox' name={pokedexName} defaultChecked /> {pokedexName}</label>
          ))
        }))

        setFilterNodes(prevState => ({
          ...prevState,
          elements: types.map(type => (
            <label key={type}><input type='checkbox' name={type} defaultChecked /> {type}</label>
          ))
        }))
      } catch (error) {
        console.log('error con los filtros de generacion')
      }
    } getFilterList()
  }, [])

  return { filterNodes, checkboxNames }
}
