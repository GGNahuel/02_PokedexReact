/* eslint-disable camelcase */
import { useEffect, useState, useContext } from 'react'
import { SearchContext } from '../context/searchContext'
import { getNationalPokedex, getPokemonInfo } from '../services/getPokeApis'
import { PREFIX_API, POKEMON_PREFIX_API, regExpIDPKMN } from '../services/constantes'
// import { generatePokeElements } from "../services/generatePokeElements";

export function usePokemonsGenerator () {
  const { resultsDetails, filtersDefault } = useContext(SearchContext)
  const { page, search, filters } = resultsDetails

  const [pkmns, setPkmns] = useState([])
  const [mainResults, setMainResults] = useState([])
  const [currentResults, setCurrentResults] = useState([])

  async function generatePokeElements (pokeArray) {
    const indexPkmn = page * 20
    pokeArray.sort(function (a, b) { return a.id - b.id })
    const pokeElements = []
    for (let pkmn = indexPkmn; pkmn < indexPkmn + 20; pkmn++) {
      if (pokeArray[pkmn]) {
        const idExtracted = regExpIDPKMN.exec(pokeArray[pkmn].url)
        const dataPkmn = await getPokemonInfo(POKEMON_PREFIX_API + idExtracted)
        pokeElements.push(dataPkmn)
      }
    }
    setPkmns(pokeElements)
  }

  async function getGenerationPokemons (results) {
    const generationApi = await getPokemonInfo(`${PREFIX_API}generation/${filters.generation}`)
    const { pokemon_species } = generationApi

    pokemon_species && pokemon_species.sort(function (a, b) {
      const idA = regExpIDPKMN.exec(a.url)
      const idB = regExpIDPKMN.exec(b.url)
      return idA - idB
    })

    const tempResults = generationApi.pokemon_species.filter(pokemon1 => {
      return results.some(pokemon2 => pokemon1.name === pokemon2.name)
    })

    generatePokeElements(tempResults)
  }

  useEffect(() => {
    async function generateContent () {
      if (mainResults.length === 0) {
        const { results } = await getNationalPokedex()
        setMainResults(results)
        setCurrentResults(results)
        generatePokeElements(results)
      }

      if (mainResults.length > 0) {
        generatePokeElements(currentResults)
      }
    }
    generateContent()
  }, [page])

  useEffect(() => {
    if (!search && mainResults.length > 0) {
      const tempMainResults = mainResults
      setCurrentResults(tempMainResults)
      if (filters.generation === 'all') generatePokeElements(tempMainResults)
      else getGenerationPokemons(tempMainResults)
      return
    }

    if (mainResults.length > 0) {
      const regExpSearch = new RegExp(search)
      let searchResults = []
      if (Number(search)) {
        searchResults.push(mainResults[search - 1])
      } else searchResults = currentResults.filter(element => regExpSearch.test(element.name))
      setCurrentResults(searchResults)

      if (filters.generation === 'all') generatePokeElements(searchResults)
      else getGenerationPokemons(searchResults)
    }
  }, [search])

  useEffect(() => {
    if (filters.generation === filtersDefault.generation && filters.pokedex === filtersDefault.pokedex) {
      generatePokeElements(currentResults)
      return
    }
    async function getPokedexEntries () {
      const firstPokedex = filters.pokedex.find(element => element && element)
      if (firstPokedex === undefined) return

      const pokedexInfo = await getPokemonInfo(`${PREFIX_API}pokedex/${firstPokedex}`)
      const { pokemon_entries } = pokedexInfo

      const filterResults = []
      for (let pokemon = 0; pokemon < pokemon_entries.length; pokemon++) {
        const pokemonToCheck = await getPokemonInfo(pokemon_entries[pokemon].pokemon_species.url)

        filters.pokedex.forEach(pokedexFilterName => {
          if (pokedexFilterName) {
            const isInPokedex = pokemonToCheck.pokedex_numbers.some(pokemonPokedexName => pokedexFilterName === pokemonPokedexName.pokedex.name)
            if (isInPokedex) {
              filterResults.push(pokemon_entries[pokemon].pokemon_species)
            }
          }
        })
      }

      // Se va a tener que hacer un estado aparte al current results para guardar los resultados de los filtros,
      // probar tambien, meter el search dentro del filters en el contexto global, y tomarlo como si fuese un filtro más
      // dentro de este useEffect
      const tempResults = filterResults.filter(pokemon1 => {
        return currentResults.some(pokemon2 => pokemon1.name === pokemon2.name)
      })

      generatePokeElements(tempResults)
    }
    if (!filters.pokedex.every(name => name)) getPokedexEntries()
    if (filters.generation !== 'all') getGenerationPokemons(currentResults)
  }, [filters])

  return pkmns
}
