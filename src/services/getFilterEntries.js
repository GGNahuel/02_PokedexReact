/* eslint-disable camelcase */

import { getPokemonInfo } from './getPokeApis'
import { PREFIX_API, regExpIDPKMN } from './constantes'

const FILTER_TYPES = {
  generation: {
    linkRoute: 'generation',
    entriesArrayName: 'pokemon_species',
    routeToEntrieName: null
  },
  pokedex: {
    linkRoute: 'pokedex',
    entriesArrayName: 'pokemon_entries',
    routeToEntrieName: 'pokemon_species'
  },
  type: {
    linkRoute: 'type',
    entriesArrayName: 'pokemon',
    routeToEntrieName: 'pokemon'
  },
  habitat: {
    linkRoute: 'pokemon-habitat',
    entriesArrayName: 'pokemon_species',
    routeToEntrieName: null
  }
}

function checkValidFilterType (filterType = String) {
  return Object.keys(FILTER_TYPES).includes(filterType)
}

export async function getEntriesFromOptionFilter (arrayToFilter, itemName, filterType) {
  if (!checkValidFilterType(filterType)) {
    console.warn('El filtro elegido no corresponde con los definidos')
    return
  }

  const LINK = PREFIX_API + FILTER_TYPES[filterType].linkRoute + '/' + itemName
  const dataApi = await getPokemonInfo(LINK)

  if (dataApi) {
    const entries = dataApi[FILTER_TYPES[filterType].entriesArrayName]
    entries.sort(function (a, b) {
      const idA = regExpIDPKMN.exec(a.url)
      const idB = regExpIDPKMN.exec(b.url)
      return idA - idB
    })

    const tempResults = entries.filter(pokemon1 => {
      return arrayToFilter.some(pokemon2 => pokemon1.name === pokemon2.name)
    })

    return tempResults
  }
}

export async function getEntriesFromCheckboxsFilter (arrayToFilter, selectedItems, filterType = String) {
  if (!checkValidFilterType(filterType)) {
    console.warn('El filtro elegido no corresponde con los definidos')
    return
  }

  const setLinkFromIndex = indx => PREFIX_API + FILTER_TYPES[filterType].linkRoute + '/' + selectedItems[indx].toLowerCase()
  const entriesArrayName = FILTER_TYPES[filterType].entriesArrayName
  const nameRoute = FILTER_TYPES[filterType].routeToEntrieName

  const itemApi1 = await getPokemonInfo(setLinkFromIndex(0))
  let filterResults = itemApi1[entriesArrayName]

  for (let itemIndx = 1; itemIndx < selectedItems.length; itemIndx++) {
    const itemApi2 = await getPokemonInfo(setLinkFromIndex(itemIndx))
    const pokemonsInApi2 = itemApi2[entriesArrayName]

    filterResults = filterResults.filter(pokemonA => {
      return pokemonsInApi2.some(pokemonB => pokemonA[nameRoute].name === pokemonB[nameRoute].name)
    })
  }

  const tempResults = filterResults.filter(pokemon1 => {
    return arrayToFilter.some(pokemon2 => pokemon2.name === pokemon1[nameRoute].name)
  }).map(element => element[nameRoute])

  return tempResults
}
