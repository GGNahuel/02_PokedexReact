export function renameProps(dataObj){
    const newProperites = {
        name: dataObj.name,
        id: dataObj.id,
        sprite: dataObj.sprites.front_default,
        elements: dataObj.types,
        stats: dataObj.stats,
        weight: dataObj.weight/10,
        height: dataObj.height*10,
        speciesURL: dataObj.species.url
    }

    return newProperites
}

// "https://pokeapi.co/api/v2/pokemon-species/259/", ex
export function renameEvolutionProps(dataObj){
    const regExtractID = /(?<=species\/)[0-9]{1,}/  
    const IDExtracted = dataObj.species.url.match(regExtractID)
    const newProperites = {
        nameLink: dataObj.species.name,
        evolutionDetails: dataObj.evolution_details,
        evolvesTo: dataObj.evolves_to,
        idLink: IDExtracted[0]
    }
    return newProperites
}

export function renameTypeProps(dataObj){
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

export const POKEMON_PREFIX_API = "https://pokeapi.co/api/v2/pokemon/"