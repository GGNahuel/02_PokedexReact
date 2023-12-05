import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/searchContext'
import { POKEMON_PREFIX_API, regExpIDPKMN } from '../services/constantes'
import { getNationalPokedex, getPokemonInfo } from '../services/getPokeApis'
import { useFilterNodes } from './useFilterNodes'
import { getGenerationPokemons, getFilterEntries } from '../services/getFilterEntries'

export function usePokemonsGenerator () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { page, filters } = resultsDetails

  const { checkboxNames } = useFilterNodes()

  const [pkmns, setPkmns] = useState([])
  const [mainResults, setMainResults] = useState([])
  const [currentResults, setCurrentResults] = useState([])

  async function generatePokeElements (pokeArray) {
    const indexPkmn = page * 20
    pokeArray.sort(function (a, b) { return a.id - b.id })

    setResultsDetails(prev => ({
      ...prev,
      totalPages: Math.floor(pokeArray.length / 20)
    }))

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
    async function generateFilteredContent () {
      const tempMainResults = mainResults
      let tempResults = []

      const { search } = filters
      if (search !== '' && search) {
        const regExpSearch = new RegExp(search)
        if (Number(search)) {
          tempResults.push(mainResults[search - 1])
        } else tempResults = tempMainResults.filter(element => regExpSearch.test(element.name))
      } else tempResults = tempMainResults

      tempResults = filters.generation !== 'all' ? await getGenerationPokemons(tempResults, filters.generation) : tempResults

      const selectedPokedexes = filters.pokedex.filter(element => element && element)
      tempResults = selectedPokedexes.length !== checkboxNames.pokedexNames.length
        ? await getFilterEntries(tempResults, selectedPokedexes, 'pokedex')
        : tempResults

      const selectedTypes = filters.elements.filter(element => element && element)
      tempResults = selectedTypes.length !== checkboxNames.elementNames.length
        ? await getFilterEntries(tempResults, selectedTypes, 'type')
        : tempResults

      setCurrentResults(tempResults)
      if (page === 0) {
        generatePokeElements(tempResults)
      }
      setResultsDetails(prevState => ({
        ...prevState,
        page: 0
      }))
    }
    generateFilteredContent()
  }, [filters])

  return pkmns
}
