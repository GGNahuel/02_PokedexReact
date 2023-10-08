import { useState } from "react"
import { TarjetaPkmn } from "./PokemonCard"
import { usePokemonsGenerator } from "../hooks/usePokemonsGenerator"

export function SectionResultados({page}) {
    const [tarjetaExpandida, setTarjetaExpandida] = useState(null)

    function toggleSelected(id) {
        if (tarjetaExpandida === id) {
            setTarjetaExpandida(null)
        } else {
            setTarjetaExpandida(id)
        }
    }

    return (
        <section id="pokeResultados">
            {usePokemonsGenerator({page:page}).map(dataPkmn => (
                <TarjetaPkmn
                    key={dataPkmn.id}
                    dataObj={dataPkmn}
                    idSelected={tarjetaExpandida}
                    toggleSelected={toggleSelected}
                />)
            )}
        </section>
    )
}