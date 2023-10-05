import { useEffect, useState } from "react";
import { getNationalPokedex, getPokemonInfo } from "../services/getPokeApis"

export function usePokemonsGenerator({page, searchValue}) {
    const [pkmns, addPkmns] = useState([])
    const [mainResults, setMainResults] = useState([])

    page = Number(page * 20)

    async function generatePokeElements(pokeArray) {
        const pokeElements = []
        for (let pkmn = page; pkmn < page + 20; pkmn++) {
            if (pokeArray[pkmn]) {
                const dataPkmn = await getPokemonInfo(pokeArray[pkmn].url)
                pokeElements.push(dataPkmn)
            }
        }
        addPkmns(pokeElements)
    }

    useEffect(() => {
        async function generateContent() {
            if (mainResults.length == 0) {
                const { results } = await getNationalPokedex()
                setMainResults(results)
                generatePokeElements(results)
            }

            if (mainResults.length > 0) {
                generatePokeElements(mainResults)
            }
        }
        generateContent()
    }, [page])

    return pkmns
}
