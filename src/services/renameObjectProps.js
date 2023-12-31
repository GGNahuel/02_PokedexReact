import { regExpIDPKMN } from './constantes'
import { fixedText } from './fixText'

export function renameProps (dataObj) {
  const stats = dataObj.stats.map(element => ({
    ...element,
    stat: { name: fixedText(element.stat.name) }
  }))
  const elements = dataObj.types.map(element => ({
    name: fixedText(element.type.name, false),
    url: element.type.url
  }))

  const newProperites = {
    name: fixedText(dataObj.name),
    id: dataObj.id,
    sprite: dataObj.sprites.front_default,
    alternativeSprite: dataObj.sprites.other['official-artwork'].front_default,
    elements,
    stats,
    weight: dataObj.weight / 10,
    height: dataObj.height * 10,
    speciesURL: dataObj.species.url,
    locationsURL: dataObj.location_area_encounters
  }

  return newProperites
}

export function renameSpecieProps (dataObj) {
  const pokedexNumbers = dataObj.pokedex_numbers.map(element => ({
    entry: element.entry_number,
    pokedex: fixedText(element.pokedex.name)
  }))
  const description = dataObj.flavor_text_entries.find(element => element.language.name === 'en').flavor_text
  const habitat = dataObj.habitat ? fixedText(dataObj.habitat.name) : 'desconocida'

  const newProps = {
    generation: fixedText(dataObj.generation.name),
    isLegendary: dataObj.is_legendary,
    isMithic: dataObj.is_mythical,
    habitat,
    pokedexNumbers,
    description: fixedText(description)
  }
  return newProps
}

export function renameEvolutionProps (dataObj) {
  const IDExtracted = dataObj.species.url.match(regExpIDPKMN)[0]

  const evolutionDetails = dataObj.evolution_details[0]
  const filteredEvolutionDetails = []
  for (const key in evolutionDetails) {
    if (evolutionDetails[key]) {
      filteredEvolutionDetails.push({
        condition: fixedText(key),
        value: fixedText(evolutionDetails[key].name ? evolutionDetails[key].name : evolutionDetails[key], false)
      })
    }
  }

  const newProperites = {
    nameLink: fixedText(dataObj.species.name),
    evolutionDetails: filteredEvolutionDetails,
    evolvesTo: dataObj.evolves_to,
    idLink: IDExtracted,
    spriteSource: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${IDExtracted}.png`
  }
  return newProperites
}

export function renameTypeProps (dataObj) {
  const newProperites = {
    baseElement: fixedText(dataObj.name),
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
    // methods, conditions
  }

  return newProperites
}
