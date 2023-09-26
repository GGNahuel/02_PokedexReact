export async function getPokemonInfo(urlPokemon) {
    try {
        const pokemonLink = await fetch(urlPokemon)
        const pokemonInfo = await pokemonLink.json()
        return pokemonInfo
    } catch (error) {
        return "Error al obtener la info del pokemon." + error
    }
}