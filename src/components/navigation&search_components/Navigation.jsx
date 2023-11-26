import { useContext } from 'react'
import { SearchContext } from '../../context/searchContext'

export function Nav () {
  const { setResultsDetails } = useContext(SearchContext)

  const updateSearch = (event) => {
    event.preventDefault()
    const value = event.target.searcher.value
    setResultsDetails(prevState => {
      const prevFilters = prevState.filters

      return ({
        ...prevState,
        filters: {
          ...prevFilters,
          search: value
        }
      })
    })
  }

  return (
    <header>
      <nav id='main_nav'>
        <img className='nav_logo' src='/logo_pokedex.png' alt='' />
        <form onSubmit={updateSearch} className='nav_busqueda'>
          <label htmlFor='searcher'>Búsqueda
          </label>
          <input type='search' name='searcher' id='searcher' placeholder='Nombre o id del pokemon' />
          <button type='submit'>Buscar</button>
        </form>
        <button className='nav_modo'>Cambiar modo nocturno/diurno</button>
      </nav>
    </header>
  )
}
