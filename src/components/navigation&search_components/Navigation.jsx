export function Nav({ getSearch }) {

    const updateSearch = (event) => {
        event.preventDefault()
        getSearch(event.target.searcher.value)
    }

    return (
        <header>
            <nav>
                <img className="nav_logo" src="/logo_pokedex.png" alt="" />
                <div className="nav_busqueda">
                    <p>Búsqueda</p>
                    <form onSubmit={updateSearch}>
                        <input type="search" name="searcher" id="searcher" placeholder="Nombre o id del pokemon" />
                        <button type="submit">Buscar</button>
                    </form>
                    <p>Filtros:</p>
                    <div>
                        <p>Generación</p>
                        <div>
                            <input type="radio" name="generation_filter" id="generation1" />
                            <label htmlFor="generation1">1era generación</label>
                        </div>
                        <p>Pokedex</p>
                        <div>
                            <input type="checkbox" name="pokedex_filter" id="pokedexHoenn" />
                            <label htmlFor="pokedexHoenn">Hoenn</label>
                        </div>
                        <p>Elementos</p>
                        <div>
                            <input type="checkbox" name="type_filter" id="waterType" />
                            <label htmlFor="waterType">water</label>
                        </div>
                    </div>
                    <p>Ordenar por</p>
                    <div>
                        <input type="radio" name="sortResults" id="sortAbc" />
                        <label htmlFor="sortAbc">Alfabeticamente</label>
                        <input type="radio" name="sortResults" id="sortId"/>
                        <label htmlFor="sortId">Índice</label>
                        <input type="radio" name="sortResults" id="sortHP"/>
                        <label htmlFor="sortHP">Hp</label>
                    </div>
                </div>
                <button className="nav_modo">Cambiar modo nocturno/diurno</button>
            </nav>
        </header>
    )
}