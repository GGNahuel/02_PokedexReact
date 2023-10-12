import { useState } from "react"
import { TarjetaPkmn } from "./PokemonCard"
import { usePokemonsGenerator } from "../hooks/usePokemonsGenerator"
import { ExpandedCardBody } from "./PokemonCard_components/cardBody"

export function SectionResultados({ page, search }) {
    const [tarjetaExpandida, setTarjetaExpandida] = useState(null)
    const [dataObjSelected, setDataObjSelected] = useState(null)

    function toggleSelected(id, dataObj) {
        if (tarjetaExpandida === id) {
            setTarjetaExpandida(null)
            setDataObjSelected(null)
        } else {
            setTarjetaExpandida(id)
            setDataObjSelected(dataObj)
        }
    }

    return (
        <>
            <section id="pokeResultados">
                {usePokemonsGenerator({ page: page, searchValue: search }).map(dataPkmn => (
                    <TarjetaPkmn
                        key={dataPkmn.id}
                        dataObj={dataPkmn}
                        idSelected={tarjetaExpandida}
                        toggleSelected={toggleSelected}
                    />)
                )}
            </section>
            {dataObjSelected && <ExpandedCardBody dataObj={dataObjSelected}/>}
        </>
    )
}