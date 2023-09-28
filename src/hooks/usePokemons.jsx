import { useEffect, useState } from "react";
import { getPokedex, getPokemonInfo } from "../services/getPokeApis"

export function usePokemons(startIndex) {
    const [pkmns, addPkmns] = useState([])
    const [resultsOBJ, setResultsOBJ] = useState([])

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
            if (resultsOBJ.length == 0) {
                const { results } = await getPokedex()
                setResultsOBJ(results)
                generatePokeElements(results)

                // PARA PROBAR (borrar esto dsps)
                const infoSwampert = await getPokemonInfo(results[259].url)
                console.log(infoSwampert)
            }

            if (resultsOBJ.length > 0) { //probar mover el primer condicional a otro useEffect con dependencia vacia
                generatePokeElements(resultsOBJ)
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