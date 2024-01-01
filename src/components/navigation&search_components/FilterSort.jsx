import { useContext, useState } from 'react'
import { DetailsFilterElement } from '../others/DetailsFilterElement'
import { SearchContext } from '../../context/searchContext'
import { useFilterNodes } from '../../hooks/useFilterNodes'
import { fixedText } from '../../services/fixText'

export function FilterSort () {
  const { resultsDetails, setResultsDetails } = useContext(SearchContext)
  const { filters } = resultsDetails
  const [equalsSelectedTempFilters, setEqualsFilters] = useState(true)

  const { checkboxNames } = useFilterNodes()

  const getSelectedItems = () => {
    const formNode = document.getElementById('filters_sorts')

    const selectedGeneration = formNode.generation_filter.value
    const selectedPokedexes = checkboxNames.pokedexNames.filter(pokedexName => formNode[pokedexName].checked && pokedexName)
    const selectedTypes = checkboxNames.typeNames.filter(typeName => formNode[typeName].checked && typeName)
    const selectedHabitat = formNode.habitat_filter.value
    const selectedSort = formNode.sortResults.value

    return { selectedGeneration, selectedPokedexes, selectedTypes, selectedHabitat, selectedSort }
  }

  const checkSelectedItems = () => {
    const { selectedGeneration, selectedPokedexes, selectedTypes, selectedHabitat, selectedSort } = getSelectedItems()

    const lengthcondition = selectedPokedexes.length === filters.pokedex.length && selectedTypes.length === filters.type.length
    const samePokedexes = selectedPokedexes.every((item, index) => item === filters.pokedex[index])
    const sameTypes = selectedTypes.every((item, index) => item === filters.types[index])
    const sameHabitats = selectedHabitat === filters.habitat
    const sameGeneration = selectedGeneration === filters.generation
    const sameSort = selectedSort === resultsDetails.sort

    const condition = lengthcondition && sameGeneration && sameTypes && samePokedexes && sameHabitats && sameSort
    setEqualsFilters(condition)
  }

  const changeForm = (checkboxesToChange) => {
    const formNode = document.getElementById('filters_sorts')

    checkboxNames[`${checkboxesToChange}Names`].forEach(name => {
      formNode[name].checked = false
    })

    checkSelectedItems()
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()

    const { selectedGeneration, selectedPokedexes, selectedTypes, selectedHabitat, selectedSort } = getSelectedItems()

    setResultsDetails(prevState => {
      const searchValue = prevState.filters.search
      return ({
        ...prevState,
        filters: {
          search: searchValue,
          generation: selectedGeneration,
          pokedex: selectedPokedexes,
          type: selectedTypes,
          habitat: selectedHabitat
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
          <DetailsFilterElement title='Generación'>
            <label><input type='radio' name='generation_filter' defaultChecked value='all' onChange={checkSelectedItems} /> Todas</label>
            {checkboxNames.generationNames.map(generation => (
              <label key={generation}><input type='radio' name='generation_filter' value={generation} onChange={checkSelectedItems} />
                {fixedText(generation)}
              </label>
            ))}
          </DetailsFilterElement>

          <DetailsFilterElement title='Pokedexes' hasResetButtonType='pokedex' hasResetButtonFunc={changeForm}>
            {checkboxNames.pokedexNames.map(pokedexName => (
              <label key={pokedexName}><input type='checkbox' name={pokedexName} onChange={checkSelectedItems} />
                {fixedText(pokedexName)}
              </label>
            ))}
          </DetailsFilterElement>

          <DetailsFilterElement title='Elementos' hasResetButtonType='type' hasResetButtonFunc={changeForm}>
            {checkboxNames.typeNames.map(type => (
              <label key={type}><input type='checkbox' name={type} onChange={checkSelectedItems} />
                {type}
              </label>
            ))}
          </DetailsFilterElement>

          <DetailsFilterElement title='Hábitat'>
            <label><input type='radio' name='habitat_filter' defaultChecked value='all' onChange={checkSelectedItems} />Todas</label>
            {checkboxNames.habitatNames.map(habitat => (
              <label key={habitat}><input type='radio' name='habitat_filter' value={habitat} onChange={checkSelectedItems} />
                {fixedText(habitat)}
              </label>
            ))}
          </DetailsFilterElement>
        </ul>
      </details>
      <DetailsFilterElement title='Ordenar por'>
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
      </DetailsFilterElement>
      <div>
        {!equalsSelectedTempFilters && <p>Hay cambios sin aplicar</p>}
        <button type='submit'>Aplicar Cambios</button>
      </div>
    </form>
  )
}
