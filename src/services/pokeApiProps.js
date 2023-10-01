export function renameProps(dataObj){
    const newProperites = {
        name: dataObj.name,
        id: dataObj.id,
        sprite: dataObj.sprites.front_default,
        elements: dataObj.types,
        stats: dataObj.stats,
        weight: dataObj.weight/10,
        height: dataObj.height*10
    }

    return newProperites
}