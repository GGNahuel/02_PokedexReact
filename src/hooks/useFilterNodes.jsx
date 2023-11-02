import { useState, useEffect, useContext } from 'react'
import { SearchContext } from '../context/searchContext'

export function useFilterNodes () {
  const [filterNodes, setFilterNodes] = useState({
    generation: [],
    pokedex: [],
    elements: []
  })
  const { checkboxNames } = useContext(SearchContext)

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

        const pokedexes = await checkboxNames.pokedexNames
        setFilterNodes(prevState => ({
          ...prevState,
          pokedex: pokedexes.map(pokedexName => (
            <label key={pokedexName}><input type='checkbox' name={pokedexName} defaultChecked /> {pokedexName}</label>
          ))
        }))

        const types = await checkboxNames.elementNames
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

  return { filterNodes }
}
