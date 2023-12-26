import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/searchContext'
import { POKEMON_PREFIX_API, regExpIDPKMN } from '../services/constantes'
import { getNationalPokedex, getPokemonInfo } from '../services/getPokeApis'
import { getEntriesFromOptionFilter, getEntriesFromCheckboxsFilter } from '../services/getFilterEntries'

export function usePokemonsGenerator () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { page, filters, sort } = resultsDetails

  const [pkmns, setPkmns] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mainResults, setMainResults] = useState([])
  const [currentResults, setCurrentResults] = useState([])

  async function generatePokeElements (pokeArray) {
    const indexPkmn = (page - 1) * 20
    setIsLoading(true)

    const pokeElements = []
    for (let pkmn = indexPkmn; pkmn < indexPkmn + 20; pkmn++) {
      if (pokeArray[pkmn]) {
        const idExtracted = regExpIDPKMN.exec(pokeArray[pkmn].url)
        const dataPkmn = await getPokemonInfo(POKEMON_PREFIX_API + idExtracted)
        pokeElements.push(dataPkmn)
      }
    }

    if (sort !== 'default') {
      pokeElements.sort((a, b) => {
        if (sort === 'name') return a.name.localeCompare(b.name)
        if (a[sort]) return a[sort] - b[sort]

        const indxSortStatA = a.stats.findIndex(statObj => statObj.stat.name === sort)
        const indxSortStatB = b.stats.findIndex(statObj => statObj.stat.name === sort)
        return a.stats[indxSortStatA].base_stat - b.stats[indxSortStatB].base_stat
      })
    }

    setPkmns(pokeElements)
    setIsLoading(false)
    setResultsDetails(prevState => ({
      ...prevState,
      totalPages: Math.ceil(pokeArray.length / 20)
    }))
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

      tempResults = filters.generation !== 'all' ? await getEntriesFromOptionFilter(tempResults, filters.generation, 'generation') : tempResults

      tempResults = filters.pokedex.length !== 0 ? await getEntriesFromCheckboxsFilter(tempResults, filters.pokedex, 'pokedex') : tempResults

      tempResults = filters.types.length !== 0 ? await getEntriesFromCheckboxsFilter(tempResults, filters.types, 'type') : tempResults

      tempResults = filters.habitat !== 'all' ? await getEntriesFromOptionFilter(tempResults, filters.habitat, 'habitat') : tempResults

      setCurrentResults(tempResults)
      if (page === 1) {
        generatePokeElements(tempResults)
      }
      setResultsDetails(prevState => ({
        ...prevState,
        page: 1,
        totalPages: 0
      }))
    }
    if (mainResults.length > 0) generateFilteredContent()
  }, [filters])

  return { pkmns, isLoading }
}
