/* eslint-disable camelcase */

import { getPokemonInfo } from './getPokeApis'
import { PREFIX_API, regExpIDPKMN } from './constantes'

export async function getGenerationPokemons (arrayToFilter, generationName) {
  const generationApi = await getPokemonInfo(`${PREFIX_API}generation/${generationName}`)

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

export async function getFilterEntries (arrayToFilter, selectedItems, filterType = String) {
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

  const tempResults = filterResults.filter(pokemon1 => {
    return arrayToFilter.some(pokemon2 => pokemon2.name === pokemon1[nameRoute].name)
  }).map(element => element[nameRoute])

  return tempResults
}
