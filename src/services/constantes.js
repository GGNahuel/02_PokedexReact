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

export function renameEvolutionProps(dataObj){
    const newProperites = {
        nameLink: dataObj.species.name,
        evolutionDetails: dataObj.evolution_details,
        evolvesTo: dataObj.evolves_to
    }
    return newProperites
}

export const regExtractID = /[0-9]{1,}(?=\/")/