export async function getPokedex() {
    try {
        const api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        const data = await api.json()
        return data
    }catch(error){
        console.warn(error)
        return "Error al obtener los datos de la pokedex"
    }
}

export async function getPokemonInfo(urlPokemon) {
    try {
        const pokemonLink = await fetch(urlPokemon)
        const pokemonInfo = await pokemonLink.json()
        return pokemonInfo
    } catch (error) {
        return "Error al obtener la info del pokemon." + error
    }
}