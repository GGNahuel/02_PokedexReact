import { useEffect, useState } from 'react'

export function useFilterNodes () {
  const [checkboxNames, setCheckboxNames] = useState({
    generationNames: [],
    pokedexNames: [],
    typeNames: [],
    habitatNames: []
  })

  useEffect(() => {
    async function getFilterList () {
      const SUFIX_LIMIT_API = '?limit=100/'
      try {
        const apiGenerations = await fetch('https://pokeapi.co/api/v2/generation/' + SUFIX_LIMIT_API)
        const dataGenerations = await apiGenerations.json()
        const generations = dataGenerations.results.map(generation => generation.name)

        const apiTypes = await fetch('https://pokeapi.co/api/v2/type/' + SUFIX_LIMIT_API)
        const dataTypes = await apiTypes.json()
        const types = dataTypes.results.map(element => element.name.toUpperCase())

        const apiPokedex = await fetch('https://pokeapi.co/api/v2/pokedex/' + SUFIX_LIMIT_API)
        const dataPokedex = await apiPokedex.json()
        const pokedexes = dataPokedex.results.map(pokedex => pokedex.name)

        const apiHabitat = await fetch('https://pokeapi.co/api/v2/pokemon-habitat/' + SUFIX_LIMIT_API)
        const dataHabitat = await apiHabitat.json()
        const habitats = dataHabitat.results.map(element => element.name)

        setCheckboxNames({
          generationNames: generations, pokedexNames: pokedexes, typeNames: types, habitatNames: habitats
        })
      } catch (error) {
        console.log('error con los filtros de generacion' + error)
      }
    } getFilterList()
  }, [])

  return { checkboxNames }
}
