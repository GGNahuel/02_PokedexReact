export async function getNationalPokedex() {
    try {
        const api = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
        const data = await api.json()
        return data
    }catch(error){
        console.warn(error)
        return "Error al obtener los datos de la pokedex nacional"
    }
}

// Ejemplo de una urlPokemon https://pokeapi.co/api/v2/pokemon/1/ (el 1 es de la id del pkmn)
export async function getPokemonInfo(urlPokemon) {
    try {
        const pokemonLink = await fetch(urlPokemon)
        const pokemonInfo = await pokemonLink.json()
        return pokemonInfo
    } catch (error) {
        return "Error al obtener la info del pokemon. " + error
    }
}

export async function getPokemonSpecie(url){
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error){
        return "Error al obtener info de la especie del pokemon. " + error
    }
}

export async function getPokemonEvolutionChain(url){
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error){
        return "Error al obtener info de la cadena de evolución. " + error
    }
}

export async function getTypeInfo(url){
    try{
        const res = await fetch(url)
        const data = await res.json()
        return data
    }catch(error){
        return "Error al obtener las caraterísticas del elemento"
    }
}