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
    const selectedSort = formNode.sortResults.value

    return { selectedGeneration, selectedPokedexes, selectedTypes, selectedSort }
  }

  const checkSelectedItems = () => {
    const { selectedGeneration, selectedPokedexes, selectedTypes, selectedSort } = getSelectedItems()

    const lengthcondition = selectedPokedexes.length === filters.pokedex.length && selectedTypes.length === filters.elements.length
    const samePokedexes = selectedPokedexes.every((item, index) => item === filters.pokedex[index])
    const sameTypes = selectedTypes.every((item, index) => item === filters.elements[index])
    const sameGeneration = selectedGeneration === filters.generation
    const sameSort = selectedSort === resultsDetails.sort

    const condition = lengthcondition && sameGeneration && sameTypes && samePokedexes && sameSort
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

    const { selectedGeneration, selectedPokedexes, selectedTypes, selectedSort } = getSelectedItems()

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
        sort: selectedSort
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
          <label><input type='radio' name='sortResults' value='default' defaultChecked onChange={checkSelectedItems} /> Por defecto</label>
          <label><input type='radio' name='sortResults' value='name' onChange={checkSelectedItems} /> Alfabeticamente</label>
          <fieldset>
            <legend>Estadística <span className='normal' title='Por cuestiones de rendimiento esto solo ordenará la página actual'>❔</span></legend>
            <label><input type='radio' name='sortResults' value='hp' onChange={checkSelectedItems} /> Hp</label>
            <label><input type='radio' name='sortResults' value='attack' onChange={checkSelectedItems} /> Ataque</label>
            <label><input type='radio' name='sortResults' value='defense' onChange={checkSelectedItems} /> Defensa</label>
            <label><input type='radio' name='sortResults' value='special-attack' onChange={checkSelectedItems} /> Ataque especial</label>
            <label><input type='radio' name='sortResults' value='special-defense' onChange={checkSelectedItems} /> Defensa especial</label>
            <label><input type='radio' name='sortResults' value='speed' onChange={checkSelectedItems} /> Velocidad</label>
            <label><input type='radio' name='sortResults' value='weight' onChange={checkSelectedItems} /> Peso</label>
            <label><input type='radio' name='sortResults' value='height' onChange={checkSelectedItems} /> Altura</label>
          </fieldset>
        </div>
      </DetailsSummary>
      <div>
        {!equalsSelectedTempFilters && <p>Hay cambios sin aplicar</p>}
        <button type='submit'>Aplicar Cambios</button>
      </div>
    </form>
  )
}
