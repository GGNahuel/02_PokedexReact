import { Nav } from "./components/nav"
import { SectionResultados } from "./components/SectionResultados"
import "./styles.css"

export function App(){
    return(
        <>
            <Nav />
            <main>
                <SectionResultados />
            </main>
        </>
    )
}