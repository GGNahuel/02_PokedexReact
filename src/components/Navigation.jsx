
export function Nav({ getSearch }){

    const updateSearch = (event) => {
        event.preventDefault()
        getSearch(event.target.searcher.value)
    }

    return(
        <header>
        <nav>
            <img className="nav_logo" src="/logo_pokedex.png" alt="" />
            <div className="nav_busqueda">
                <p>Búsqueda</p>
                <form onSubmit={updateSearch}>
                    <input type="search" name="searcher" id="" placeholder="Nombre o id del pokemon"/>
                    Filtrar por
                    Ordenar por
                    <button type="submit">Buscar</button>
                </form>
            </div>
            <button className="nav_modo">Cambiar modo nocturno/diurno</button>
        </nav>
        </header>
    )
}