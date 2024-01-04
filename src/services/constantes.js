export const PREFIX_API = 'https://pokeapi.co/api/v2/'
export const POKEMON_PREFIX_API = 'https://pokeapi.co/api/v2/pokemon/'
export const regExpIDPKMN = /(?<=\/)[0-9]+/

export const FILTERS_INFO = {
  generation: {
    inputType: 'radio',
    default: 'all',
    urlSufix: 'generation/'
  },
  pokedex: {
    inputType: 'checkbox',
    default: 0,
    urlSufix: 'pokedex/'
  },
  type: {
    inputType: 'checkbox',
    default: 0,
    urlSufix: 'type/'
  },
  habitat: {
    inputType: 'radio',
    default: 'all',
    urlSufix: 'pokemon-habitat/'
  }
}

export const STATS_FOR_SORTING = [
  'hp',
  'attack', 'special-attack', 'defense', 'special-defense',
  'speed', 'weight', 'height'
]
