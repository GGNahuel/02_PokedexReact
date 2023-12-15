import { useContext, useState } from 'react'
import { DetailsSummary } from './DetailsSummary'
import { SearchContext } from '../../context/searchContext'
import { useFilterNodes } from '../../hooks/useFilterNodes'

export function FilterSort () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { filters } = resultsDetails
  const [equalsSelectedTempFilters, setEqualsFilters] = useState(true)

  const { checkboxNames } = useFilterNodes()

  const getSelectedItems = () => {
    const formNode = document.getElementById('filters_sorts')

    const selectedGeneration = formNode.generation_filter.value
    const selectedPokedexes = checkboxNames.pokedexNames.filter(pokedexName => formNode[pokedexName].checked && pokedexName)
    const selectedTypes = checkboxNames.elementNames.filter(typeName => formNode[typeName].checked && typeName)

    return { selectedGeneration, selectedPokedexes, selectedTypes }
  }

  const checkSelectedItems = () => {
    const { selectedGeneration, selectedPokedexes, selectedTypes } = getSelectedItems()

    const lengthcondition = selectedPokedexes.length === filters.pokedex.length && selectedTypes.length === filters.elements.length
    const samePokedexes = selectedPokedexes.every((item, index) => item === filters.pokedex[index])
    const sameTypes = selectedTypes.every((item, index) => item === filters.elements[index])

    const condition = lengthcondition && selectedGeneration === filters.generation && sameTypes && samePokedexes
    setEqualsFilters(condition)
  }

  const changeForm = (checkedInputs = Boolean, checkboxesToChange) => {
    const formNode = document.getElementById('filters_sorts')

    if (checkboxesToChange === 'pokedex') {
      checkboxNames.pokedexNames.forEach(pokedexName => {
        formNode[pokedexName].checked = checkedInputs
      })
    } else if (checkboxesToChange === 'type') {
      checkboxNames.elementNames.forEach(typeName => {
        formNode[typeName].checked = checkedInputs
      })
    }

    checkSelectedItems()
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const { selectedGeneration, selectedPokedexes, selectedTypes } = getSelectedItems()

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

    setEqualsFilters(true)
  }

  return (
    <form id='filters_sorts' onSubmit={ev => { handleSubmit(ev) }}>
      <details>
        <summary>Filtros:</summary>
        <ul>
          <DetailsSummary classList='filter_details' title='Generación'>
            <div>
              <label><input type='radio' name='generation_filter' defaultChecked value='all' onChange={checkSelectedItems} /> Todas</label>
              {checkboxNames.generationNames.map(generation => (
                <label key={generation}><input type='radio' name='generation_filter' value={generation} onChange={checkSelectedItems} /> {generation}</label>
              ))}
            </div>
          </DetailsSummary>

          <DetailsSummary classList='filter_details' title='Pokedex'>
            <div id='pokedexFilterNodes'>
              {checkboxNames.pokedexNames.map(pokedexName => (
                <label key={pokedexName}><input type='checkbox' name={pokedexName} onChange={checkSelectedItems} /> {pokedexName}</label>
              ))}
            </div>
            <div className='filter_buttons_container'>
              <button type='button' onClick={ev => { changeForm(false, 'pokedex') }}>Resetear</button>
            </div>
          </DetailsSummary>

          <DetailsSummary classList='filter_details' title='Elementos'>
            <div id='typeFilterNodes'>
              {checkboxNames.elementNames.map(type => (
                <label key={type}><input type='checkbox' name={type} onChange={checkSelectedItems} /> {type}</label>
              ))}
            </div>
            <div className='filter_buttons_container'>
              <button type='button' onClick={ev => { changeForm(false, 'type') }}>Resetear</button>
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
        {!equalsSelectedTempFilters && <p>Hay filtros sin aplicar</p>}
        <button type='submit'>Aplicar Cambios</button>
      </div>
    </form>
  )
}
