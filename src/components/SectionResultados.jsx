import { useEffect, useState } from "react"
import { TarjetaPkmn } from "./TarjetaPkmn"
import { usePokemons } from "../hooks/usePokemons"

export function SectionResultados() {
    const [tarjetaExpandida, setTarjetaExpandida] = useState(null)
    //const [pokemons, setPokemons] = useState([])
    const [page, setPage] = useState(0)

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

    function changePage() {
    //    const value=document.querySelector(".input.page").value
        setPage(251)
    //    console.log(value)
    }

    return (
        <section id="pokeResultados">
            <input type="text" className="input page"></input>
            <button type="button" onClick={changePage}>Cambiar pagina</button>
            {pokemons}
        </section>
    )
}