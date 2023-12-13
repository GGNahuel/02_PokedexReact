import { useContext, useState } from 'react'
import { DetailsSummary } from './DetailsSummary'
import { SearchContext } from '../../context/searchContext'
import { useFilterNodes } from '../../hooks/useFilterNodes'

export function FilterSort () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { filters } = resultsDetails
  const [equalsSelectedTempFilters, setEqualsFilters] = useState(true)
  /* const [tempSelectedItems, setTempSelectedItems] = useState({
    tempGeneration: 'all',
    tempPokedexes: 0,
    tempTypes: 0
  }) */
  const { checkboxNames } = useFilterNodes()

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
  }

  const getSelectedItems = () => {
    const formNode = document.getElementById('filters_sorts')

    const selectedGeneration = formNode.generation_filter.value
    const selectedPokedexes = checkboxNames.pokedexNames.map(pokedexName => {
      if (formNode[pokedexName].checked) return pokedexName
      else return null
    })
    const selectedTypes = checkboxNames.elementNames.map(typeName => {
      if (formNode[typeName].checked) return typeName
      else return null
    })

    return { selectedGeneration, selectedPokedexes, selectedTypes }
  }

  const changeTempSelectedItems = () => {
    const { selectedGeneration, selectedPokedexes, selectedTypes } = getSelectedItems()

    const samePokedexes = selectedPokedexes.every((item, index) => item === filters.pokedex[index])
    const sameTypes = selectedTypes.every((item, index) => item === filters.elements[index])
    const condition = selectedGeneration === filters.generation && sameTypes && samePokedexes

    setEqualsFilters(condition)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const allIncludedPokedexes = ev.target.includedPokedexes.checked
    const allIncludedTypes = ev.target.includedTypes.checked

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
        },
        allPokedexes: allIncludedPokedexes,
        allTypes: allIncludedTypes
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
              <label><input type='radio' name='generation_filter' defaultChecked value='all' onChange={changeTempSelectedItems} /> Todas</label>
              {checkboxNames.generationNames.map(generation => (
                <label key={generation}><input type='radio' name='generation_filter' value={generation} onChange={changeTempSelectedItems} /> {generation}</label>
              ))}
            </div>
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Pokedex'>
            <label><input type='checkbox' name='includedPokedexes' defaultChecked /> Incluir todas</label>
            <div id='pokedexFilterNodes'>
              {checkboxNames.pokedexNames.map(pokedexName => (
                <label key={pokedexName}><input type='checkbox' name={pokedexName} defaultChecked onChange={changeTempSelectedItems} /> {pokedexName}</label>
              ))}
            </div>
            <div className='filter_buttons_container'>
              <button type='button' onClick={ev => { changeForm(true, 'pokedex') }}>Resetear</button>
              <button type='button' onClick={ev => { changeForm(false, 'pokedex') }}>Vaciar</button>
            </div>
          </DetailsSummary>
          <DetailsSummary classList='filter_details' title='Elementos'>
            <label><input type='checkbox' name='includedTypes' defaultChecked /> Incluir todos</label>
            <div id='typeFilterNodes'>
              {checkboxNames.elementNames.map(type => (
                <label key={type}><input type='checkbox' name={type} defaultChecked onChange={changeTempSelectedItems} /> {type}</label>
              ))}
            </div>
            <div className='filter_buttons_container'>
              <button type='button' onClick={ev => { changeForm(true, 'type') }}>Resetear</button>
              <button type='button' onClick={ev => { changeForm(false, 'type') }}>Vaciar</button>
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
