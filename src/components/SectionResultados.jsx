import { useState } from "react"
import { TarjetaPkmn } from "./TarjetaPkmn"
import { usePokemons } from "../hooks/usePokemons"

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

    const pokemons = usePokemons(page).map(dataPkmn => (
        <TarjetaPkmn
            key={dataPkmn.id}
            id={dataPkmn.id}
            name={dataPkmn.name}
            spriteSRC={dataPkmn.sprites.front_default}
            idSelected={tarjetaExpandida}
            toggleSelected={toggleSelected}
        />)
    )

    function updateInputValue(event){
        setInputValue(event.target.value)
    }
    function changePage() {
        console.log(inputValue)
        setPage(inputValue)
    }

    return (
        <section id="pokeResultados">
            <input type="number" className="input_page" onChange={updateInputValue}></input>
            <button type="button" onClick={changePage}>Cambiar pagina</button>
            {pokemons}
        </section>
    )
}