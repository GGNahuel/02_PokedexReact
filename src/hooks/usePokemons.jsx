import { useEffect, useState } from "react";
import { getPokedex } from "../services/getPokedex"
import { getPokemonInfo } from "../services/getPokemonInfo"

export function usePokemons(startIndex) {
    const [pkmns, addPkmns] = useState([])

    useEffect(() => {
        async function generateContent() {
            //if (pkmns == []) {
                const { results } = await getPokedex()
                console.log(results)
            //}
            const pokeElements = []
            for (let pkmn = startIndex; pkmn < startIndex + 20; pkmn++) {
                const dataPkmn = await getPokemonInfo(results[pkmn].url)
                pokeElements.push(dataPkmn)
            }
            addPkmns(pokeElements)

        }
        generateContent()

    }, [startIndex])
    // probar sin usar los hooks nativos NO FUNCIONA
    // probar solo sin el useEffect pero sí con el useState NO
    // probar pasar como argumento también la página que se muestra y ponerlo en la dependencia del useEffect
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