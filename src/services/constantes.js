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

// to extract the 259 from "https://pokeapi.co/api/v2/pokemon-species/259/", ex
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


export const POKEMON_PREFIX_API = "https://pokeapi.co/api/v2/pokemon/"