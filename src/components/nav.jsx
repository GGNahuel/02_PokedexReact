export function Nav(){
    return(
        <header>
        <nav>
            <img className="nav_logo" src="/logo_pokedex.png" alt="" />
            <div className="nav_busqueda">
                <p>Búsqueda</p>
                <ul>
                    <li><input type="search" name="" id="" /></li>
                    Filtros
                    <li>Región</li>
                    <li>Tipo</li>
                    <button type="button"></button>
                </ul>
            </div>
            <button className="nav_modo">Cambiar modo nocturno/diurno</button>
        </nav>
        </header>
    )
}