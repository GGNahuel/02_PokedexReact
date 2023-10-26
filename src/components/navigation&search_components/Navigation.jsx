import { useContext } from "react"
import { SearchContext } from "../../context/searchContext"

export function Nav() {
    const { setResultsDetails } = useContext(SearchContext);

    const updateSearch = (event) => {
        event.preventDefault()
        const value= event.target.searcher.value;
        setResultsDetails( prevState => ({
            ...prevState,
            search: value,
            page: 0,
            pageInput: 0
        }))
    }

    return (
        <header>
            <nav>
                <img className="nav_logo" src="/logo_pokedex.png" alt="" />
                <div className="nav_busqueda">
                    <form onSubmit={updateSearch}>
                        <label>Búsqueda
                            <input type="search" name="searcher" placeholder="Nombre o id del pokemon" />
                        </label>
                        <button type="submit">Buscar</button>
                    </form>
                </div>
                <button className="nav_modo">Cambiar modo nocturno/diurno</button>
            </nav>
        </header>
    )
}