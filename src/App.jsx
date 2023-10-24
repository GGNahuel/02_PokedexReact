import { SearchContextProvider } from "./context/searchContext"

import { Nav } from "./components/navigation&search_components/Navigation"
import { PageSelector } from "./components/navigation&search_components/PageSelector"
import { SectionResultados } from "./components/SectionResultados"
import "./styles.css"
import { Filter_Sort } from "./components/navigation&search_components/Filter_Sort"

export function App() {
    // para cuando el cambio de pagina sea directamente al seleccionar la pagina (y no al submit)
    // usar solo el estado de page y borrar el del input. Osea pasar al inputValue del PageSelector el estado page
    // y en la funcion getInputValue usar el setPage, el sendPageSelected ya no se usaría.
    // Y agregar el debounce

    return (
        <SearchContextProvider>
            <Nav/>
            <main>
                <Filter_Sort/>
                <PageSelector/>
                <div style={{display:"grid",gridTemplateColumns:"80% 20%"}}>
                    <SectionResultados/>
                </div>
                <PageSelector/>
            </main>
        </SearchContextProvider>
    )
}