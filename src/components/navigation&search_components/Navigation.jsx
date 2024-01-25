import { useContext } from 'react'
import { SearchContext } from '../../context/searchContext'
import { GlobalSettings } from '../../context/globalSettingsContext'

export function Nav () {
  const { setResultsDetails } = useContext(SearchContext)
  const { globalSettings, setGlobalSettings } = useContext(GlobalSettings)

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
        <section className='nav_options'>
          <form onSubmit={updateSearch} className='nav_busqueda'>
            <label>
              <input type='search' name='searcher' placeholder='Nombre o id del pokemon' />
            </label>
            <button type='submit' className='jump_btn'><span className='material-symbols-outlined'>search</span></button>
          </form>
          <label className='nav_modo'>
            <input
              type='checkbox' name='theme_switcher' id='theme_switcher' onChange={() => {
                const newThemeValue = globalSettings.theme === 'light' ? 'dark' : 'light'
                setGlobalSettings(prev => ({ ...prev, theme: newThemeValue }))
              }} defaultChecked={globalSettings.theme === 'dark'}
            />
          </label>
        </section>
        <button type='button' className='jump_btn'><span className='material-symbols-outlined'>menu</span></button>
      </nav>
    </header>
  )
}
