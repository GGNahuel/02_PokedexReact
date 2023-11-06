/* eslint-disable camelcase */
import { useEffect, useState, useContext } from 'react'
import { SearchContext } from '../context/searchContext'
import { getNationalPokedex, getPokemonInfo } from '../services/getPokeApis'
import { PREFIX_API, POKEMON_PREFIX_API, regExpIDPKMN } from '../services/constantes'
// import { generatePokeElements } from "../services/generatePokeElements";

export function usePokemonsGenerator () {
  const { resultsDetails } = useContext(SearchContext)
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
      setCurrentResults(tempMainResults) // cambiar
      generatePokeElements(tempMainResults)
      return
    }

    if (mainResults.length > 0) {
      const regExpSearch = new RegExp(search)
      let searchResults = []
      if (Number(search)) {
        searchResults.push(mainResults[search - 1])
      } else searchResults = currentResults.filter(element => regExpSearch.test(element.name))
      setCurrentResults(searchResults)
      generatePokeElements(searchResults)
    }
  }, [search])

  useEffect(() => {
    if (filters.generation === '' || filters.generation === 'all') {
      generatePokeElements(currentResults)
      return
    }

    async function getGenerationPokemons () {
      const generationApi = await getPokemonInfo(`${PREFIX_API}generation/${filters.generation}`)
      const { pokemon_species } = generationApi

      pokemon_species.sort(function (a, b) {
        const idA = regExpIDPKMN.exec(a.url)
        const idB = regExpIDPKMN.exec(b.url)
        return idA - idB
      })

      const tempResults = pokemon_species.filter(pokemon1 => {
        return currentResults.some(pokemon2 => pokemon1.name === pokemon2.name)
      })

      generatePokeElements(tempResults)
    }
    getGenerationPokemons()
  }, [filters])

  return pkmns
}
