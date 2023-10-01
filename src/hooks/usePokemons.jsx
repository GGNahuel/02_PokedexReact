import { useEffect, useState } from "react";
import { getNationalPokedex, getPokemonInfo } from "../services/getPokeApis"

export function usePokemons(startIndex) {
    const [pkmns, addPkmns] = useState([])
    const [mainResults, setMainResults] = useState([])

    startIndex = Number(startIndex * 20)

    async function generatePokeElements(pokeArray) {
        const pokeElements = []
        for (let pkmn = startIndex; pkmn < startIndex + 20; pkmn++) {
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
    }, [startIndex])

    return pkmns
}

/*
        getPokedex()
            .then(({ results }) => {
                // const pkmnsInPage = results.slice(0,20)
                const pokeElements= []
                for(let pkmn=0;pkmn<20;pkmn++){
                // pkmnsInPage.forEach( element => {
                    // getPokemonInfo(element.url)
                    getPokemonInfo(results[pkmn].url)
                        .then(dataPkmn => {
                            const pokemon=(
                            <TarjetaPkmn
                                key={dataPkmn.id}
                                id={dataPkmn.id}
                                name={dataPkmn.name}
                                spriteSRC={dataPkmn.sprites.front_default}
                            />)
                            pokeElements.push(pokemon)
                            addPkmns(pokeElements)
                        });
                }

                console.log(pkmns, pokeElements)
            })
        */