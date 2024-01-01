import { useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/searchContext'
import { POKEMON_PREFIX_API, regExpIDPKMN } from '../services/constantes'
import { getNationalPokedex, getPokemonInfo } from '../services/getPokeApis'
import { getEntriesFromOptionFilter, getEntriesFromCheckboxsFilter } from '../services/getFilterEntries'

export function usePokemonsGenerator () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { page, filters, sort, filterInputTypes } = resultsDetails

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
        if (dataPkmn) pokeElements.push(dataPkmn)
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
      let tempResults = mainResults

      const { search } = filters
      if (search !== '' && search) {
        const regExpSearch = new RegExp(search)
        if (Number(search)) {
          generatePokeElements([{
            url: POKEMON_PREFIX_API + search
          }])
          return
        } else {
          tempResults = tempResults.filter(element => regExpSearch.test(element.name))
        }
      }

      const { optionInput, checkboxInput } = filterInputTypes
      for (const key in filters) {
        if (optionInput.filterTypes.includes(key) && filters[key] !== optionInput.defaultValue) {
          tempResults = await getEntriesFromOptionFilter(tempResults, filters[key], key)
        }
        if (checkboxInput.filterTypes.includes(key) && filters[key].length !== checkboxInput.defaultValue) {
          tempResults = await getEntriesFromCheckboxsFilter(tempResults, filters[key], key)
        }
      }

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
