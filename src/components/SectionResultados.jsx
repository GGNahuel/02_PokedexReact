import { useEffect, useState } from "react"
import { TarjetaPkmn } from "./TarjetaPkmn"
import { getPokedex } from "../services/getPokedex"
import { getPokemonInfo } from "../services/getPokemonInfo"

export function SectionResultados() {
    const [pkmns, addPkmns] = useState([])

    const [tarjetaExpandida, setTarjetaExpandida] = useState(null)

    function toggleSelected(id) {
        if (tarjetaExpandida === id) {
            setTarjetaExpandida(null)
        } else {
            setTarjetaExpandida(id)
        }
    }

    useEffect(() => {
        async function generateContent() {
            const { results } = await getPokedex()
            const pokeElements = []
            for (let pkmn = 0; pkmn < 20; pkmn++) {
                const dataPkmn = await getPokemonInfo(results[pkmn].url)
                const pokemon = (
                    <TarjetaPkmn
                        key={dataPkmn.id}
                        id={dataPkmn.id}
                        name={dataPkmn.name}
                        spriteSRC={dataPkmn.sprites.front_default}
                        idSelected={tarjetaExpandida}
                        toggleSelected={toggleSelected}
                    />)
                pokeElements.push(pokemon)
                // hacer un customHook y que esto retorne el array pokeElements con los dataPkmn pusheados 
                // (en lugar de los elementos pokemon). Así se hace el mapeado en el elemento SectionResultados directamente.
                // el hook tendría que tener el usestate y el useeffect y tendria el estado "pkmns" como argumento? o como retorno tambien?
            }
            addPkmns(pokeElements)
        } generateContent()
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
    }, [])

    // crear otro useEffect que dependa del estado tarjetaExpandida que no tenga que volver a hacer peticiones a la API,
    // sino que acceda al array de los elementos (el estado pkmns) y los vuelva a renderizar

    return (
        <section id="pokeResultados">
            {pkmns}
        </section>
    )
}