export const regExpIDPKMN = /(?<=\/)[0-9]+/

export function renameProps (dataObj) {
  const newProperites = {
    name: dataObj.name,
    id: dataObj.id,
    sprite: dataObj.sprites.front_default,
    alternativeSprite: dataObj.sprites.other['official-artwork'].front_default,
    elements: dataObj.types,
    stats: dataObj.stats,
    weight: dataObj.weight / 10,
    height: dataObj.height * 10,
    speciesURL: dataObj.species.url,
    locationsURL: dataObj.location_area_encounters
  }

  return newProperites
}

// "https://pokeapi.co/api/v2/pokemon-species/259/", ex
export function renameEvolutionProps (dataObj) {
  const IDExtracted = dataObj.species.url.match(regExpIDPKMN)
  const newProperites = {
    nameLink: dataObj.species.name,
    evolutionDetails: dataObj.evolution_details,
    evolvesTo: dataObj.evolves_to,
    idLink: IDExtracted[0]
  }
  return newProperites
}

export function renameTypeProps (dataObj) {
  const newProperites = {
    baseElement: dataObj.name,
    x2DmgFrom: dataObj.damage_relations.double_damage_from,
    x2DmgTo: dataObj.damage_relations.double_damage_to,
    halfDmgFrom: dataObj.damage_relations.half_damage_from,
    halfDmgTo: dataObj.damage_relations.half_damage_to,
    noDmgFrom: dataObj.damage_relations.no_damage_from,
    noDmgTo: dataObj.damage_relations.no_damage_to
  }
  return newProperites
}

export function renameLocationEncounterAreas (dataObj) {
  const versionDetails = dataObj.version_details
  const versionNames = versionDetails.map(element => element.version.name)
  const maxChances = versionDetails.map(element => element.max_chance)
  const encounterDetails = versionDetails.map(element => element.encounter_details)
  // ⚠️ encounterDetails devuelve un array de arrays

  // const methods = encounterDetails.map(element => element.map(object => object.method.name))
  // const conditions = encounterDetails.map(element => element.map(object => object.condition_values))

  const newProperites = {
    location: dataObj.location_area.name,
    versionDetails,
    versionNames,
    maxChances,
    encounterDetails
    // methods: methods,
    // conditions: conditions
  }

  return newProperites
}

export const PREFIX_API = 'https://pokeapi.co/api/v2/'
export const POKEMON_PREFIX_API = 'https://pokeapi.co/api/v2/pokemon/'
