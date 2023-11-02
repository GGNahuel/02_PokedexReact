import { useContext } from 'react'
import { DetailsSummary } from './DetailsSummary'
import { SearchContext } from '../../context/searchContext'
import { useFilterNodes } from '../../hooks/useFilterNodes'

export function FilterSort () {
  const { filterNodes } = useFilterNodes()

  const { resultsDetails, setResultsDetails, checkboxNames } = useContext(SearchContext)

  const changeForm = (ev, checkedInputs = Boolean) => {
    const formNode = ev.target.parentNode.parentNode
    formNode.generation_filter.value = checkedInputs && 'all' // si el checkedInputs es true significa que se reseteó el form
    checkboxNames.pokedexNames.forEach(pokedexName => {
      formNode[pokedexName].checked = checkedInputs
    })
    checkboxNames.elementNames.forEach(typeName => {
      formNode[typeName].checked = checkedInputs
    })
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

    setResultsDetails(prevState => ({
      ...prevState,
      filters: {
        generation: selectedGeneration,
        pokedex: selectedPokedexes,
        elements: selectedTypes
      }
    }))
    console.log(resultsDetails.filters)
  }

  return (
    <form id='filters_sorts' onSubmit={ev => { handleSubmit(ev) }}>
      <div>
        <button type='submit'>Aplicar Cambios</button>
        <button type='button' onClick={ev => { changeForm(ev, true) }}>Resetear</button>
        <button type='button' onClick={ev => { changeForm(ev, false) }}>Vaciar</button>
      </div>
      <details>
        <summary>Filtros:</summary>
        <ul>
          <DetailsSummary classList='filter_details' title='Generación'>
            <label><input type='radio' name='generation_filter' defaultChecked value='all' /> Todas</label>
            {filterNodes && filterNodes.generation}
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Pokedex'>
            {filterNodes && filterNodes.pokedex}
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Elementos'>
            {filterNodes && filterNodes.elements}
          </DetailsSummary>
        </ul>
      </details>
      <details>
        <summary>Ordenar por</summary>
        <label><input type='radio' name='sortResults' /> Alfabeticamente</label>
        <label><input type='radio' name='sortResults' /> Índice</label>
        <label><input type='radio' name='sortResults' /> Hp</label>
      </details>
    </form>
  )
}
