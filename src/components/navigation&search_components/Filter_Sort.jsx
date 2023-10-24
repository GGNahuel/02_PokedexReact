export function Filter_Sort() {
    return (
        <form onSubmit={ev =>{
            ev.preventDefault()
        }}>
            <details>
                <summary>Filtros:</summary>
                <ul>
                    <details>
                        <summary>Generación</summary>
                        <label><input type="radio" name="generation_filter" /> 1era generación</label>
                        <label><input type="radio" name="generation_filter" /> 2da generación</label>
                        <label><input type="radio" name="generation_filter" /> 3era generación</label>
                    </details>
                    <details>
                        <summary>Pokedex</summary>
                        <label><input type="checkbox" name="pokedex_filter" /> Kanto</label>
                        <label><input type="checkbox" name="pokedex_filter" /> Johto</label>
                        <label><input type="checkbox" name="pokedex_filter" /> Hoenn</label>
                    </details>
                    <details>
                        <summary>Elementos</summary>
                        <label><input type="checkbox" name="type_filter" /> fire</label>
                        <label><input type="checkbox" name="type_filter" /> grass</label>
                        <label><input type="checkbox" name="type_filter" /> water</label>
                    </details>
                </ul>
            </details>
            <details>
                <summary>Ordenar por</summary>
                <label><input type="radio" name="sortResults" /> Alfabeticamente</label>
                <label><input type="radio" name="sortResults" /> Índice</label>
                <label><input type="radio" name="sortResults" /> Hp</label>
            </details>
            <button type="submit">Aplicar Cambios</button>
        </form>
    )
}