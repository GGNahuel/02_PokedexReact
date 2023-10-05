import { useState } from "react"
import { TarjetaPkmn } from "./PokemonCard"
import { usePokemonsGenerator } from "../hooks/usePokemonsGenerator"

export function SectionResultados() {
    const [tarjetaExpandida, setTarjetaExpandida] = useState(null)
    const [page, setPage] = useState(0)
    const [inputValue, setInputValue] = useState(0)

    function toggleSelected(id) {
        if (tarjetaExpandida === id) {
            setTarjetaExpandida(null)
        } else {
            setTarjetaExpandida(id)
        }
    }

    function updateInputValue(event) {
        setInputValue(event.target.value)
    }
    
    function changePage() {
        setPage(inputValue)
    }

    return (
        <section id="pokeResultados">
            <input type="number" className="input_page" onChange={updateInputValue}></input>
            <button type="button" onClick={changePage}>Cambiar pagina</button>
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