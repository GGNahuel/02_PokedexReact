import { useContext } from 'react'
import { DetailsSummary } from './DetailsSummary'
import { SearchContext } from '../../context/searchContext'
import { useFilterNodes } from '../../hooks/useFilterNodes'

export function FilterSort () {
  const { filterNodes, checkboxNames } = useFilterNodes()

  const { setResultsDetails } = useContext(SearchContext)

  const changeForm = (ev, checkedInputs = Boolean, checkboxesToChange) => {
    const formNode = document.getElementById('filters_sorts')
    // ev.target.parentNode.parentNode.parentNode.parentNode.parentNode
    if (checkboxesToChange === 'pokedex') {
      checkboxNames.pokedexNames.forEach(pokedexName => {
        formNode[pokedexName].checked = checkedInputs
      })
    } else if (checkboxesToChange === 'type') {
      checkboxNames.elementNames.forEach(typeName => {
        formNode[typeName].checked = checkedInputs
      })
    }
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const selectedGeneration = ev.target.generation_filter.value
    const selectedPokedexes = filterNodes.pokedex.map((_, index) => {
      const pokedexName = checkboxNames.pokedexNames[index]
      if (ev.target[pokedexName].checked) return pokedexName
      else return null
    })
    const selectedTypes = filterNodes.elements.map((_, index) => {
      const typeName = checkboxNames.elementNames[index]
      if (ev.target[typeName].checked) return typeName
      else return null
    })

    setResultsDetails(prevState => {
      const searchValue = prevState.filters.search
      return ({
        ...prevState,
        filters: {
          search: searchValue,
          generation: selectedGeneration,
          pokedex: selectedPokedexes,
          elements: selectedTypes
        }
      })
    })
  }

  return (
    <form id='filters_sorts' onSubmit={ev => { handleSubmit(ev) }}>
      <details>
        <summary>Filtros:</summary>
        <ul>
          <DetailsSummary classList='filter_details' title='Generación'>
            <div>
              <label><input type='radio' name='generation_filter' defaultChecked value='all' /> Todas</label>
              {filterNodes && filterNodes.generation}
            </div>
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Pokedex'>
            <div>{filterNodes && filterNodes.pokedex}</div>
            <div className='filter_buttons_container'>
              <button type='button' onClick={ev => { changeForm(ev, true, 'pokedex') }}>Resetear</button>
              <button type='button' onClick={ev => { changeForm(ev, false, 'pokedex') }}>Vaciar</button>
            </div>
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Elementos'>
            <div>{filterNodes && filterNodes.elements}</div>
            <div className='filter_buttons_container'>
              <button type='button' onClick={ev => { changeForm(ev, true, 'type') }}>Resetear</button>
              <button type='button' onClick={ev => { changeForm(ev, false, 'type') }}>Vaciar</button>
            </div>
          </DetailsSummary>
        </ul>
      </details>
      <DetailsSummary classList='filter_details' title='Ordenar por'>
        <div>
          <label><input type='radio' name='sortResults' /> Alfabeticamente</label>
          <label><input type='radio' name='sortResults' /> Índice</label>
          <label><input type='radio' name='sortResults' /> Hp</label>
        </div>
      </DetailsSummary>
      <div>
        <button type='submit'>Aplicar Cambios</button>
      </div>
    </form>
  )
}
