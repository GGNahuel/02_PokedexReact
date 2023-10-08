import { useState } from "react"

import { Nav } from "./components/nav"
import { PageSelector } from "./components/navigation&search_components/PageSelector"
import { SectionResultados } from "./components/SectionResultados"
import "./styles.css"

export function App() {
    const [inputValue, setInputValue] = useState(0)
    const [page, setPage] = useState(0)

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

    return (
        <>
            <Nav />
            <main>
                <PageSelector getInputValue={getInputValue} inputValue={inputValue} sendPageSelected={sendPageSelected} />
                <SectionResultados page={page} />
                <PageSelector getInputValue={getInputValue} inputValue={inputValue} sendPageSelected={sendPageSelected} />
            </main>
        </>
    )
}