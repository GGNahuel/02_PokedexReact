import { getPokemonInfo } from "./getPokeApis"

export async function generatePokeElements(pokeArray) {
    const pokeElements = []
    for (let pkmn = page; pkmn < page + 20; pkmn++) {
        if (pokeArray[pkmn]) {
            const dataPkmn = await getPokemonInfo(pokeArray[pkmn].url)
            pokeElements.push(dataPkmn)
        }
    }
    return pokeElements
}