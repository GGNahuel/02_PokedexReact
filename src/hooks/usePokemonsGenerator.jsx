/* eslint-disable camelcase */
import { useEffect, useState, useContext } from 'react'
import { SearchContext } from '../context/searchContext'
import { getNationalPokedex, getPokemonInfo } from '../services/getPokeApis'
import { PREFIX_API, POKEMON_PREFIX_API, regExpIDPKMN } from '../services/constantes'
import { useFilterNodes } from './useFilterNodes'

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

  async function getGenerationPokemons (arrayToFilter) {
    const generationApi = await getPokemonInfo(`${PREFIX_API}generation/${filters.generation}`)

    if (generationApi) {
      const { pokemon_species } = generationApi
      pokemon_species.sort(function (a, b) {
        const idA = regExpIDPKMN.exec(a.url)
        const idB = regExpIDPKMN.exec(b.url)
        return idA - idB
      })

      const tempResults = generationApi.pokemon_species.filter(pokemon1 => {
        return arrayToFilter.some(pokemon2 => pokemon1.name === pokemon2.name)
      })

      return tempResults
    }
  }

  async function getFilterEntries (arrayToFilter, selectedItems, filterType = String) {
    if (selectedItems.length === 0) return []
    if (filterType !== 'pokedex' && filterType !== 'type') {
      console.log('Error al ingresar el parametro filterType en la función getFilterEntries')
      return []
    }

    const nameRoute = filterType === 'pokedex' ? 'pokemon_species' : 'pokemon'

    const itemApi1 = await getPokemonInfo(`${PREFIX_API}${filterType}/${selectedItems[0].toLowerCase()}`)
    let filterResults = filterType === 'pokedex' ? itemApi1.pokemon_entries : itemApi1.pokemon

    for (let itemIndx = 1; itemIndx < selectedItems.length; itemIndx++) {
      const itemApi2 = await getPokemonInfo(`${PREFIX_API}${filterType}/${selectedItems[itemIndx].toLowerCase()}`)
      const pokemonsInApi2 = filterType === 'pokedex' ? itemApi2.pokemon_entries : itemApi2.pokemon

      filterResults = filterResults.filter(pokemonA => {
        return pokemonsInApi2.some(pokemonB => pokemonA[nameRoute].name === pokemonB[nameRoute].name)
      })
    }

    const tempResults = arrayToFilter.filter(pokemon1 => {
      return filterResults.some(pokemon2 => pokemon1.name === pokemon2[nameRoute].name)
    })

    return tempResults
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

      tempResults = filters.generation !== 'all' ? await getGenerationPokemons(tempResults) : tempResults

      const selectedPokedexes = filters.pokedex.filter(element => element && element)
      tempResults = selectedPokedexes.length !== checkboxNames.pokedexNames.length
        ? await getFilterEntries(tempResults, selectedPokedexes, 'pokedex')
        : tempResults

      const selectedTypes = filters.elements.filter(element => element && element.toLowerCase())
      tempResults = selectedTypes.length !== checkboxNames.elementNames.length
        ? await getFilterEntries(tempResults, selectedTypes, 'type')
        : tempResults

      setCurrentResults(tempResults)
      if (page === 0) {
        generatePokeElements(tempResults)
      }
      setResultsDetails(prevState => ({
        ...prevState,
        page: 0,
        pageInput: 0
      }))
    }
    generateFilteredContent()
  }, [filters])

  return pkmns
}
