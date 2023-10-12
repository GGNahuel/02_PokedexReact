import { useState } from "react"

import { Nav } from "./components/Navigation"
import { PageSelector } from "./components/navigation&search_components/PageSelector"
import { SectionResultados } from "./components/SectionResultados"
import "./styles.css"

export function App() {
    const [inputValue, setInputValue] = useState(0)
    const [page, setPage] = useState(0)
    const [ search, setSearch ] = useState("")

    function getInputValue(page) {
        setInputValue(page)
    }

    function sendPageSelected() {
        setPage(inputValue)
    }

    // para cuando el cambio de pagina sea directamente al seleccionar la pagina (y no al submit)
    // usar solo el estado de page y borrar el del input. Osea pasar al inputValue del PageSelector el estado page
    // y en la funcion getInputValue usar el setPage, el sendPageSelected ya no se usaría.
    // Y agregar el debounce

    const getSearch= (value) => {
        setSearch(value)
        setInputValue(0)
        setPage(0)
    }

    return (
        <>
            <Nav getSearch={getSearch} />
            <main>
                <PageSelector getInputValue={getInputValue} inputValue={inputValue} sendPageSelected={sendPageSelected} />
                <div style={{display:"grid",gridTemplateColumns:"80% 20%"}}>
                    <SectionResultados page={page} search={search}/>
                </div>
                <PageSelector getInputValue={getInputValue} inputValue={inputValue} sendPageSelected={sendPageSelected} />
            </main>
        </>
    )
}